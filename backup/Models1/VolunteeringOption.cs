using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DL.Models
{
    public partial class VolunteeringOption
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; set; }
   

        public virtual Soldier IdSoldierNavigation { get; set; } = null!;
        public virtual User IdUserNavigation { get; set; } = null!;
    }
}
