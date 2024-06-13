using System;
using System.Collections.Generic;

namespace MartrysOfWar.Models
{
    public partial class Picture
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public string? Url { get; set; }
        public DateTime Date { get; set; }

        public virtual Soldier IdSoldierNavigation { get; set; } = null!;
        public virtual User IdUserNavigation { get; set; } = null!;
    }
}
