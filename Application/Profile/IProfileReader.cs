using System.Threading.Tasks;
using Application.UserDetails;

namespace Application.Profile
{
    public interface IProfileReader
    {
        Task<ProfileDto> GetProfile(string userName);
    }
}