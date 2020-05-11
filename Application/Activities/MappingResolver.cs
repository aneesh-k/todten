using System.Linq;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class MappingResolver : IValueResolver<UserActivity, AttandeeDto, bool>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
        public MappingResolver(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public bool Resolve(UserActivity source, AttandeeDto destination, bool destMember, ResolutionContext context)
        {

            var currentUser = _context.Users.SingleOrDefaultAsync(x => x.UserName ==
                _userAccessor.GetUserName()).Result;

            if (currentUser.Followings.Any(x => x.TargetId == source.AppUserId))
                return true;

            return false;



        }
    }
}