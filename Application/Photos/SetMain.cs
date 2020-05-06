using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
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
                var user = await _context.Users.SingleOrDefaultAsync
                    (r => r.UserName == _userAccessor.GetUserName());

                var prevMain = user.Photos.FirstOrDefault(r => r.IsMain == true);
                if (prevMain.Id == request.Id)
                    throw new RestExceptions(HttpStatusCode.BadRequest, new { Photo = "ALready Main" });

                prevMain.IsMain = false;

                var newPhoto = user.Photos.FirstOrDefault(r => r.Id == request.Id);

                if (newPhoto == null) throw new RestExceptions(HttpStatusCode.NotFound, new
                {
                    Photo = "Not found"
                });

                newPhoto.IsMain = true;

                var succeed = await _context.SaveChangesAsync() > 0;

                if (succeed) return Unit.Value;

                throw new System.Exception("Unable to set main functionality");


            }
        }
    }
}