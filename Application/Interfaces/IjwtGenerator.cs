using Domain;

namespace Application.Interfaces
{
    public interface IjwtGenerator
    {
        string CreateToken(AppUser user);
    }
}