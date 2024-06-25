namespace Entities.DTO
{
    public class CompletedPsalmDTO
    {
        public int Id { get; set; }
        public int IdSoldier { get; set; }
        public int IdUser { get; set; }
        public int PsalmNumber { get; set; }

        public virtual SoldierDTO Soldier { get; set; }
        public virtual UserDTO User { get; set; }
    }
}
