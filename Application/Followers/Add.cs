using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class Add
    {
        public class Command : IRequest
        {
            public string userName { get; set; }
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

                var observer = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                var target = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.userName);

                if (target == null)
                {
                    throw new RestExceptions(HttpStatusCode.BadRequest, new { User = "Not Found" });
                }
                if (observer.UserName == request.userName)
                {
                    throw new RestExceptions(HttpStatusCode.BadRequest, new { User = "Cannot follow self" });
                }

                var followers = await _context.UserFollowings
                    .SingleOrDefaultAsync(x => x.ObserverId == observer.Id && x.TargetId == target.Id);

                if (followers != null)
                    throw new RestExceptions(HttpStatusCode.BadRequest, new { Follow = "Already following" });

                if (followers == null)
                {
                    var follow = new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    };

                    _context.UserFollowings.Add(follow);


                }

                var succeed = await _context.SaveChangesAsync() > 0;

                if (succeed) return Unit.Value;

                throw new Exception("Unable to follow");

            }
        }
    }
}