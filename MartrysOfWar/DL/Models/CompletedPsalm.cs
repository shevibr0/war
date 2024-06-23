using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Models
{
    public partial class CompletedPsalm
    {
        public int Id { get; set; }
        public int SoldierId { get; set; }
        public int UserId { get; set; }
        public int PsalmNumber { get; set; }

        public virtual Soldier Soldier { get; set; }
        public virtual User User { get; set; }
    }

}
