using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DL.Models
{
    public partial class Tehilim
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public DateTime Date { get; set; }
        public int Count { get; set; }

        public virtual Soldiers IdSoldierNavigation { get; set; }
        public virtual Users IdUserNavigation { get; set; }
    }
}
