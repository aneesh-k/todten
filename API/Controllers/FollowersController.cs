using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Followers;
using Application.UserDetails;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/profile")]
    public class FollowersController : BaseController
    {

        [HttpPost("{username}/follow")]
        public async Task<ActionResult<Unit>> Follow(string username)
        {
            return await Mediator.Send(new Add.Command { userName = username });
        }

        [HttpDelete("{username}/follow")]
        public async Task<ActionResult<Unit>> UnFollow(string username)
        {
            return await Mediator.Send(new Delete.Command { userName = username });
        }

        [HttpGet("{username}/follow")]
        public async Task<ActionResult<List<ProfileDto>>> followers(string username, string predicate)
        {
            return await Mediator.Send(new List.Query { UserName = username, predicate = predicate });
        }

    }
}