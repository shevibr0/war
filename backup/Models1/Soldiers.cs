using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DL.Models
{
    public partial class Soldiers
    {
        public Soldiers()
        {
            Memories = new HashSet<Memories>();
            Pictures = new HashSet<Pictures>();
            Recipies = new HashSet<Recipies>();
            Tehilim = new HashSet<Tehilim>();
            VolunteeringOptions = new HashSet<VolunteeringOptions>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Age { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public DateTime? DateOfDeath { get; set; }
        public string HebrewDate { get; set; }
        public string PlaceOfDeath { get; set; }
        public string RankName { get; set; }
        public string RankOrganization { get; set; }
        public string Role { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string Image { get; set; }
        public string UrlToArticle { get; set; }
        public string Classification { get; set; }
        public string PlaceOfService { get; set; }
        public string BurialPlace { get; set; }
        public bool? IsApproved { get; set; }
        public bool? IsChild { get; set; }
        public bool? IsEmergencySquad { get; set; }
        public bool? AtNova { get; set; }

        public virtual ICollection<Memories> Memories { get; set; }
        public virtual ICollection<Pictures> Pictures { get; set; }
        public virtual ICollection<Recipies> Recipies { get; set; }
        public virtual ICollection<Tehilim> Tehilim { get; set; }
        public virtual ICollection<VolunteeringOptions> VolunteeringOptions { get; set; }
    }
}
