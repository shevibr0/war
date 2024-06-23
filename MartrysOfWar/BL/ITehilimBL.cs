using Entities.DTO;
using DL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    public interface ITehilimBL
    {
        Task<IEnumerable<TehilimDTO>> GetAllTehilimsAsync();
        Task<TehilimDTO> AddTehilimAsync(TehilimDTO tehilimDTO);
        Task UpdateTehilimAsync(int tehilimId, TehilimDTO updatedTehilimDTO);
        Task DeleteTehilimAsync(int tehilimId);
        Task<TehilimDTO> GetTehilimBySoliderIdUserAsync(int userId, int soliderId);
        Task<int> GetCountTehilimForSoliderAsync(int soliderId);
        Task<int> GetByUserCountTehilimForSolider(int soliderId);
        Task<int> GetBooksCountForSoliderAsync(int soliderId);
        Task<IEnumerable<int>> GetCompletedPsalmsAsync(int soldierId);
        Task AddCompletedPsalmAsync(CompletedPsalm completedPsalm);
        Task UpdateBookCountAsync(int soldierId);
    }
}
