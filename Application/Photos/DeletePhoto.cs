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
    public class DeletePhoto
    {
        public class Command : IRequest
        {
            public string PublicId { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _accessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IPhotoAccessor accessor, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _accessor = accessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.SingleOrDefaultAsync(r => r.UserName == _userAccessor.GetUserName());

                var photo = user.Photos.FirstOrDefault(r => r.Id == request.PublicId);

                if (photo == null)
                {
                    throw new RestExceptions(HttpStatusCode.NotFound, new { Photo = "Not found" });

                }

                if (photo.IsMain) throw new RestExceptions(HttpStatusCode.BadRequest, new
                {
                    Photo = "Cannot delete main Photo"
                });

                var result = _accessor.DeletePhoto(request.PublicId);

                if (result == null) throw new System.Exception("Unable to perform delete action");

                user.Photos.Remove(photo);
                _context.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Unable to delete 60");

            }
        }
    }
}