using System.Threading.Tasks;
using Application.UserDetails;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseController
    {

        [HttpGet("{username}")]
        public async Task<ActionResult<ProfileDto>> GetUser(string username)
        {
            return await Mediator.Send(new UserDetails.Query { UserName = username });
        }

    }
}