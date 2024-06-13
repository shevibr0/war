using DL.Models;

namespace DL
{
    public interface ISoldierDL
    {
        Task AddSoldierAsync(Soldier sildier);
        Task DeleteSoldierAsync(int soldierId);
        Task<IEnumerable<Soldier>> GetAllSoldiersAsync(int page);
        Task<Soldier> GetSoldierByIdAsync(int id);
        Task<Soldier> GetSoldierLast();
        Task UpdateSoldierAsync(int soldierId, Soldier updatedSoldier);
        int GetCountSoliders();
        Task<IEnumerable<Soldier>> GlobalSearchSoldiersAsync(string searchValue, int page);
        
        }


}