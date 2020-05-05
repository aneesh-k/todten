using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContext;
        public IsHostRequirementHandler(DataContext context, IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
            _context = context;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var currentUser = _httpContext.HttpContext.User?.Claims?.SingleOrDefault(r => r.Type ==
                    ClaimTypes.NameIdentifier).Value;

            var activityId = Guid.Parse(_httpContext.HttpContext.Request.RouteValues
                    .SingleOrDefault(x => x.Key == "id").Value.ToString());

            var activity = _context.Activities.FindAsync(activityId).Result;
            if (activity == null) throw new RestExceptions(HttpStatusCode.BadRequest, new
            {
                activityId = "Activity does not exist"
            });

            var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);

            if (host?.AppUser?.UserName == currentUser)
                context.Succeed(requirement);

            return Task.CompletedTask;


        }
    }
}