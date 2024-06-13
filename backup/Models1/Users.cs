using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DL.Models
{
    public partial class Users
    {
        public Users()
        {
            Memories = new HashSet<Memories>();
            Pictures = new HashSet<Pictures>();
            Recipies = new HashSet<Recipies>();
            Tehilim = new HashSet<Tehilim>();
            VolunteeringOptions = new HashSet<VolunteeringOptions>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }

        public virtual ICollection<Memories> Memories { get; set; }
        public virtual ICollection<Pictures> Pictures { get; set; }
        public virtual ICollection<Recipies> Recipies { get; set; }
        public virtual ICollection<Tehilim> Tehilim { get; set; }
        public virtual ICollection<VolunteeringOptions> VolunteeringOptions { get; set; }
    }
}
