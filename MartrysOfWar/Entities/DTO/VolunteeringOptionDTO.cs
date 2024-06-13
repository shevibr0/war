using DL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class VolunteeringOptionDTO
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; set; }
      

        //public virtual Soldier IdSoldierNavigation { get; set; } = null!;
        public virtual UserDTO? IdUserNavigation { get; set; } = null!;
    }
}
