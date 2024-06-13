using DL.Models;
using Entities.DTO;

namespace BL
{
    public interface ITehilimBL
    {
        Task<TehilimDTO> AddTehilimAsync(TehilimDTO tehilimDTO);
        Task DeleteTehilimAsync(int TehilimId);
        Task<IEnumerable<TehilimDTO>> GetAllTehilimsAsync();
        Task<TehilimDTO> GetTehilimBySoliderIdUserAsync(int userId, int soliderId);
        Task<int> GetCountTehilimForSoliderAsync(int soliderId);
        Task<int> GetByUserCountTehilimForSolider(int soliderId);
        Task UpdateTehilimAsync(int tehilimId, TehilimDTO updatedTehilimDTO);
    }
}