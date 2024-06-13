using DL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class SoldierDTO
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int? Age { get; set; }
        public string? Gender { get; set; }
        public string? City { get; set; }
        public DateTime? DateOfDeath { get; set; }
        public string? HebrewDate { get; set; }
        public string? PlaceOfDeath { get; set; }
        public string? RankName { get; set; }
        public string? RankOrganization { get; set; }
        public string? Role { get; set; }
        public string? ShortDescription { get; set; }
        public string? LongDescription { get; set; }
        public string? Image { get; set; }
        public string? UrlToArticle { get; set; }
        public string? Classification { get; set; }
        public string? PlaceOfService { get; set; }
        public string? BurialPlace { get; set; }
        public bool? IsApproved { get; set; }
        public bool? IsChild { get; set; }
        public bool? IsEmergencySquad { get; set; }
        public bool? AtNova { get; set; }

       // public virtual ICollection<Recipy> Recipies { get; set; }
    }
}
