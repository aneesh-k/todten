using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }

        public DbSet<Activity> Activities { get; set; }

        public DbSet<UserActivity> UserActivities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            //for onModelCreating of App user in IdentityDbContext
            base.OnModelCreating(builder);

            builder.Entity<Value>()
            .HasData(
                new Value { Id = 1, Name = "Name 101" },
                new Value { Id = 2, Name = "Name 102" },
                new Value { Id = 3, Name = "Name 103" }
            );

            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.ActivityId, ua.AppUserId }));

            builder.Entity<UserActivity>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserActivities)
                .HasForeignKey(a => a.AppUserId);

            builder.Entity<UserActivity>()
                .HasOne(a => a.Activities)
                .WithMany(u => u.UserActivities)
                .HasForeignKey(a => a.ActivityId);
        }


    }
}