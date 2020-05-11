using System.Collections.Generic;
using Domain;

namespace Application.UserDetails
{
    public class ProfileDto
    {
        public string UserName { get; set; }

        public string DisplayName { get; set; }

        public string Image { get; set; }

        public string Bio { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public bool isFollowed { get; set; }

        public int FollowerCount { get; set; }

        public int FollowingCount { get; set; }
    }
}