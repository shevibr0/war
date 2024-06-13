using System;
using System.Collections.Generic;

namespace MartrysOfWar.Models
{
    public partial class Memory
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public string Remember { get; set; } = null!;
        public DateTime Date { get; set; }

        public virtual Soldier IdSoldierNavigation { get; set; } = null!;
        public virtual User IdUserNavigation { get; set; } = null!;
    }
}
