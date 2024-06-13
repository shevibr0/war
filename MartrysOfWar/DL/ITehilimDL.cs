using DL.Models;

namespace DL
{
    public interface ITehilimDL
    {
        Task<Tehilim> AddTehilimAsync(Tehilim tehilim);
        Task DeleteTehilimAsync(int tehilimId);
        Task<IEnumerable<Tehilim>> GetAllTehilimsAsync();
        Task<Tehilim> GetTehilimBySoliderIdUserAsync(int userId, int soliderId);
        Task<int> GetCountTehilimForSoliderAsync(int soliderId);
        Task<int> GetByUserCountTehilimForSolider(int soliderId);
        Task UpdateTehilimAsync(int tehilimId, Tehilim updatedTehilim);
    }
}