using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Profile;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserDetails
{
    public class UserDetails
    {
        public class Query : IRequest<ProfileDto>
        {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, ProfileDto>
        {
            private readonly IProfileReader _profileReader;

            public Handler(IProfileReader profileReader)
            {
                _profileReader = profileReader;

            }

            public async Task<ProfileDto> Handle(Query request, CancellationToken cancellationToken)
            {
                //Logic

                // var user = await _context.Users.SingleOrDefaultAsync(r => r.UserName == request.UserName);

                // if (user == null)
                // {
                //     throw new RestExceptions(HttpStatusCode.BadRequest, new
                //     {
                //         username = "No data with the given username"
                //     });
                // }

                // return new ProfileDto
                // {
                //     UserName = user.UserName,
                //     Bio = user.Bio,
                //     DisplayName = user.DisplayName,
                //     Image = user.Photos.FirstOrDefault(r => r.IsMain)?.Url,
                //     Photos = user.Photos
                // };

                return await _profileReader.GetProfile(request.UserName);



            }
        }
    }
}