using System;
using System.Collections.Generic;

namespace DL.Models
{
    public partial class Book
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int Count { get; set; }

        public virtual Soldier IdSoldierNavigation { get; set; } = null!;
    }
}
