using System;
using System.Collections.Generic;

namespace DL.Models
{
    public partial class User
    {
        public User()
        {
            Memories = new HashSet<Memory>();
            Pictures = new HashSet<Picture>();
            Recipies = new HashSet<Recipy>();
            Tehilims = new HashSet<Tehilim>();
            VolunteeringOptions = new HashSet<VolunteeringOption>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Phone { get; set; } = null!;

        public virtual ICollection<Memory> Memories { get; set; }
        public virtual ICollection<Picture> Pictures { get; set; }
        public virtual ICollection<Recipy> Recipies { get; set; }
        public virtual ICollection<Tehilim> Tehilims { get; set; }
        public virtual ICollection<VolunteeringOption> VolunteeringOptions { get; set; }
    }
}
