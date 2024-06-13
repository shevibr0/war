using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DL.Models
{
    public partial class Volunteering
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int IdVolunteering { get; set; }
    }
}
