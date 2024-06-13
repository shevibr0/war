using System;
using System.Collections.Generic;

namespace DL.Models
{
    public partial class Volunteering
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; set; }
        public int IdVolunteering { get; set; }
    }
}
