namespace Entities.DTO
{
    public class CompletedPsalmDTO
    {
        public int Id { get; set; }
        public int SoldierId { get; set; }
        public int UserId { get; set; }
        public int PsalmNumber { get; set; }

        public virtual SoldierDTO Soldier { get; set; }
        public virtual UserDTO User { get; set; }
    }
}
