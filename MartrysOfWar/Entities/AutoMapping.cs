
using AutoMapper;
using DL.Models;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Entities
{
    public class AutoMapping: Profile
    {
        public AutoMapping()
        {
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<MemoryDTO, Memory>().ReverseMap();
            CreateMap<PictureDTO, Picture>().ReverseMap();
            CreateMap<SoldierDTO, Soldier>().ReverseMap();
            CreateMap<RecipyDTO, Recipy>().ReverseMap();
            CreateMap<TehilimDTO, Tehilim>().ReverseMap();
            CreateMap<PreparationDTO, Preparation>().ReverseMap();
            CreateMap<PersonalVolunteeringDTO, PersonalVolunteering>().ReverseMap();
            CreateMap<VolunteeringDTO, Volunteering>().ReverseMap();
            CreateMap<VolunteeringOptionDTO, VolunteeringOption>().ReverseMap();
            CreateMap<ProductsToRecipeDTO, ProductsToRecipe>().ReverseMap();
            CreateMap<apiResponseModel, SoldierApiDTO>().ReverseMap();
            CreateMap<SoldierApiDTO, Soldier>()
                .ForMember(dest => dest.DateOfDeath, opt => opt.MapFrom(src => src.date_of_death))
                .ForMember(dest => dest.IsEmergencySquad, opt => opt.MapFrom(src => src.is_emergency_squad))
                .ForMember(dest => dest.AtNova, opt => opt.MapFrom(src => src.at_nova))
                .ForMember(dest => dest.PlaceOfDeath, opt => opt.MapFrom(src => src.place_of_death))
                .ForMember(dest => dest.PlaceOfService, opt => opt.MapFrom(src => src.place_of_service))
                .ForMember(dest => dest.IsApproved, opt => opt.MapFrom(src => src.is_approved))
                .ForMember(dest => dest.BurialPlace, opt => opt.MapFrom(src => src.burial_place))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.first_name))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.last_name))
                .ForMember(dest => dest.RankName, opt => opt.MapFrom(src => src.rank_name))
                .ForMember(dest => dest.RankOrganization, opt => opt.MapFrom(src => src.rank_organization))
                .ForMember(dest => dest.ShortDescription, opt => opt.MapFrom(src => src.short_description))
                .ForMember(dest => dest.UrlToArticle, opt => opt.MapFrom(src => src.url_to_article))
                .ReverseMap();
        }
    }
}
