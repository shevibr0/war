using System;
using System.Collections.Generic;

namespace DL.Models
{
    public partial class Tehilim
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public DateTime Date { get; set; }
        public int Count { get; set; }

        public virtual Soldier IdSoldierNavigation { get; set; } = null!;
        public virtual User IdUserNavigation { get; set; } = null!;
    }
}
