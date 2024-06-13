using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
   using Entities;
    public class apiResponseModel
    {
        public int count { get; set; }
        public string next { get; set; }
        public string previous { get; set; }
        public List<SoldierApiDTO> results { get; set; }
    }

}
