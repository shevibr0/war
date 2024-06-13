using System;
using System.Collections.Generic;

namespace MartrysOfWar.Models
{
    public partial class PersonalVolunteering
    {
        public int Id { get; set; }
        public string Description { get; set; } = null!;
        public int IdVolunteering { get; set; }

        public virtual VolunteeringOption IdVolunteeringNavigation { get; set; } = null!;
    }
}
