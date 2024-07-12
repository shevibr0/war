using DL.Models;


namespace DL
{
    public interface ITehilimDL
    {
        Task<IEnumerable<Tehilim>> GetAllTehilimsAsync();
        Task<Tehilim> GetTehilimBySoliderIdUserAsync(int userId, int soliderId);
        Task<Tehilim> AddTehilimAsync(Tehilim tehilim);
        Task UpdateTehilimAsync(int tehilimId, Tehilim updatedTehilim);
        Task DeleteTehilimAsync(int tehilimId);
        Task<int> GetCountTehilimForSoliderAsync(int soliderId);
        Task<int> GetByUserCountTehilimForSolider(int soliderId);
        Task<int> GetBooksCountForSoliderAsync(int soliderId);
        Task<IEnumerable<int>> GetCompletedPsalmsAsync(int soldierId);
        Task AddCompletedPsalmAsync(CompletedPsalm completedPsalm);
        Task UpdateBookCountIfNeeded(int soldierId);
        Task<bool> AreAllPsalmsCompleted(int soldierId);
        Task ClearCompletedPsalmsForSoldier(int soldierId);
        Task DeleteCompletedPsalmsBySoldierAsync(int soldierId);
        Task<int> GetCountCompletedPsalmsForSoldierAsync(int soldierId);
    }
}
