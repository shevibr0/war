

namespace Entities.DTO
{
    public class RecipyDTO
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string? PersonalWords { get; set; }

        //public virtual Soldier IdSoldierNavigation { get; set; } = null!;
        public virtual UserDTO? IdUserNavigation { get; set; } = null!;
    }
}
