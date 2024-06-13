using System;
using System.Collections.Generic;

namespace MartrysOfWar.Models
{
    public partial class VolunteeringOption
    {
        public VolunteeringOption()
        {
            PersonalVolunteerings = new HashSet<PersonalVolunteering>();
        }

        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public string Description { get; set; } = null!;
        public DateTime Date { get; set; }

        public virtual Soldier IdSoldierNavigation { get; set; } = null!;
        public virtual User IdUserNavigation { get; set; } = null!;
        public virtual ICollection<PersonalVolunteering> PersonalVolunteerings { get; set; }
    }
}
