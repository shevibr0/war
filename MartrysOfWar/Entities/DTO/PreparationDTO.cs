

namespace Entities.DTO
{
    public class PreparationDTO
    {
        public int Id { get; set; }
        public int IdRec { get; set; }
        public int Order { get; set; }
        public string Description { get; set; }

        //public virtual Recipy IdRecNavigation { get; set; } = null!;
    }
}
