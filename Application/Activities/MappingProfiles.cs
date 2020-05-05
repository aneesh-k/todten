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
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(sour => sour.AppUser.DisplayName));


        }

    }
}