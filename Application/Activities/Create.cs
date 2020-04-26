using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;

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
            public Handler(DataContext context)
            {
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

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Data not Added");
            }
        }
    }
}