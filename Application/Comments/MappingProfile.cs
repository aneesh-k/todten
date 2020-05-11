using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Comments
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Comment, CommentsDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(r => r.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
        }

    }
}