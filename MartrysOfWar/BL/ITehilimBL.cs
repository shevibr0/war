using Entities.DTO;


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
        Task AddCompletedPsalmAsync(CompletedPsalmDTO completedPsalmDto);
        Task UpdateBookCountAsync(int soldierId);
        Task ClearCompletedPsalmsForSoldierAsync(int soldierId);
        Task<bool> AreAllPsalmsCompletedAsync(int soldierId);
        Task DeleteCompletedPsalmsBySoldierAsync(int soldierId);
        Task<int> GetCountCompletedPsalmsForSoldierAsync(int soldierId);
    }
}
