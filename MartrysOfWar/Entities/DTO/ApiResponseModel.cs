

namespace Entities.DTO
{
  
    public class apiResponseModel
    {
        public int count { get; set; }
        public string next { get; set; }
        public string previous { get; set; }
        public List<SoldierApiDTO> results { get; set; }
    }

}
