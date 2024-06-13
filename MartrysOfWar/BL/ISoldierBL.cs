using Entities.DTO;

namespace BL
{
    public interface ISoldierBL
    {
        Task AddSoldierAsync(SoldierDTO soldierDTO);
        Task DeleteSoldierAsync(int soldierId);
        Task<IEnumerable<SoldierDTO>> GetAllSoldiersAsync(int page);
        Task<SoldierDTO> GetSoldierByIdAsync(int id);
        Task UpdateSoldierAsync(int soldierId, SoldierDTO updatedSoldierDTO);
        int GetCountSoliders();
        Task<IEnumerable<SoldierDTO>> GlobalSearchSoldiersAsync(string searchValue, int page);
    }
}