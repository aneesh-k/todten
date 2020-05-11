using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.UserDetails;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profile
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public ProfileReader(DataContext context, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _context = context;

        }
        public async Task<ProfileDto> GetProfile(string userName)
        {

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == userName);

            if (user == null) throw new RestExceptions(HttpStatusCode.BadRequest, new { User = "Does not exist" });

            var currentUser = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

            var profile = new ProfileDto
            {
                UserName = user.UserName,
                Bio = user.Bio,
                DisplayName = user.DisplayName,
                Image = user.Photos.FirstOrDefault(r => r.IsMain)?.Url,
                Photos = user.Photos,
                FollowerCount = user.Followers.Count,
                FollowingCount = user.Followings.Count,
            };
            if (currentUser.Followings.Any(r => r.TargetId == user.Id))
                profile.isFollowed = true;

            return profile;

        }
    }
}