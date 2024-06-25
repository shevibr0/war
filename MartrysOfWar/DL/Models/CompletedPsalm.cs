using DL.Models;
using System.ComponentModel.DataAnnotations;

public class CompletedPsalm
{
    public int Id { get; set; }
    public int IdSoldier { get; set; }
    public int IdUser { get; set; }
    public int PsalmNumber { get; set; }
    public virtual Soldier IdSoldierNavigation { get; set; } = null!;
    public virtual User IdUserNavigation { get; set; } = null!;
}