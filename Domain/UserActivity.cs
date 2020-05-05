using System;

namespace Domain
{
    public class UserActivity
    {
        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }

        public Guid ActivityId { get; set; }

        public virtual Activity Activities { get; set; }

        public DateTime JoinedAt { get; set; }

        public bool IsHost { get; set; }
    }
}