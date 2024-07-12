

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
            CompletedPsalms = new HashSet<CompletedPsalm>(); // הוסף שורה זו
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }

        public virtual ICollection<Memory> Memories { get; set; }
        public virtual ICollection<Picture> Pictures { get; set; }
        public virtual ICollection<Recipy> Recipies { get; set; }
        public virtual ICollection<Tehilim> Tehilims { get; set; }
        public virtual ICollection<VolunteeringOption> VolunteeringOptions { get; set; }
        public virtual ICollection<CompletedPsalm> CompletedPsalms { get; set; } // הוסף שורה זו
    }
}
