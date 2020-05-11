using System.Linq;
using Domain;

namespace Application.Activities
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttandeeDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(sour => sour.AppUser.UserName))
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(sour => sour.AppUser.DisplayName))
                .ForMember(dest => dest.Image, opt =>
                        opt.MapFrom(sour => sour.AppUser.Photos.FirstOrDefault(r => r.IsMain).Url))
                .ForMember(dest => dest.following, opt => opt.MapFrom<MappingResolver>());


        }

    }
}