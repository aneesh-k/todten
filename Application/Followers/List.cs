using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Profile;
using Application.UserDetails;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<List<ProfileDto>>
        {
            public string UserName { get; set; }

            public string predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<ProfileDto>>
        {
            private readonly DataContext _context;
            private readonly IProfileReader _profileReader;
            public Handler(DataContext context, IProfileReader profileReader)
            {
                _profileReader = profileReader;
                _context = context;
            }

            public async Task<List<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var querable = _context.UserFollowings.AsQueryable();
                var profileList = new List<ProfileDto>();

                //var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.UserName);               

                switch (request.predicate)
                {
                    case "followers":
                        {
                            var profiles = await querable.Where(r => r.Target.UserName == request.UserName)
                                .ToListAsync();

                            foreach (var profile in profiles)
                            {
                                profileList.Add(await _profileReader.GetProfile(profile.Observer.UserName));
                            }

                            break;
                        }

                    case "following":
                        {
                            var profiles = await querable.Where(r => r.Observer.UserName == request.UserName)
                                .ToListAsync();

                            foreach (var profile in profiles)
                            {
                                profileList.Add(await _profileReader.GetProfile(profile.Target.UserName));
                            }
                            break;
                        }

                }
                return profileList;
                //Logic
            }
        }
    }
}