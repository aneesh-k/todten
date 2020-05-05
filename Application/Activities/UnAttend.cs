using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class UnAttend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

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

                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null) throw new RestExceptions(HttpStatusCode.BadRequest, new
                {
                    Activity = "Activity not found"
                });

                var user = _context.Users.SingleOrDefault(r => r.UserName == _userAccessor.GetUserName());

                var attandee = _context.UserActivities.SingleOrDefault(x => x.AppUserId == user.Id &&
                        x.ActivityId == request.Id);

                if (attandee == null) throw new RestExceptions(HttpStatusCode.BadRequest, new
                {
                    ActivityDto = "User already not attending Activity"
                });

                if (attandee.IsHost) throw new RestExceptions(HttpStatusCode.BadRequest, new
                {
                    Activity = "Host cannot un attend / use this request"
                });


                _context.UserActivities.Remove(attandee);

                var succeded = await _context.SaveChangesAsync() > 0;

                if (succeded) return Unit.Value;

                throw new Exception("Problem saving data");

            }
        }
    }
}