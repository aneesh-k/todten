using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Interfaces;
using System.Linq;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public DateTime Date { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }

        }

        public class CommandValiation : AbstractValidator<Command>
        {
            public CommandValiation()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Date = request.Date,
                    Description = request.Description,
                    Category = request.Category,
                    City = request.City,
                    Venue = request.Venue
                };

                var data = _context.Activities.Add(activity);

                var user = _context.Users.SingleOrDefault(x => x.UserName == _userAccessor.GetUserName());

                var attandee = new UserActivity
                {
                    AppUser = user,
                    Activities = activity,
                    IsHost = true,
                    JoinedAt = DateTime.Now
                };

                _context.UserActivities.Add(attandee);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Data not Added");
            }
        }
    }
}