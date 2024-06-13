using System;
using System.Collections.Generic;

namespace DL.Models
{
    public partial class Soldier
    {
        public Soldier()
        {
            Memories = new HashSet<Memory>();
            Pictures = new HashSet<Picture>();
            Recipies = new HashSet<Recipy>();
            Tehilims = new HashSet<Tehilim>();
            VolunteeringOptions = new HashSet<VolunteeringOption>();
        }

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

        public virtual ICollection<Memory> Memories { get; set; }
        public virtual ICollection<Picture> Pictures { get; set; }
        public virtual ICollection<Recipy> Recipies { get; set; }
        public virtual ICollection<Tehilim> Tehilims { get; set; }
        public virtual ICollection<VolunteeringOption> VolunteeringOptions { get; set; }
    }
}
