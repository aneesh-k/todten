using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttandeeDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(sour => sour.AppUser.UserName))
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(sour => sour.AppUser.DisplayName))
                .ForMember(dest => dest.Image, opt =>
                        opt.MapFrom(sour => sour.AppUser.Photos.FirstOrDefault(r => r.IsMain).Url));


        }

    }
}