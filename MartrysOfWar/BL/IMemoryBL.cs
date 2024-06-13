using Entities.DTO;

namespace BL
{
    public interface IMemoryBL
    {
        Task AddMemoryAsync(MemoryDTO memoryDto);
        Task DeleteMemoryAsync(int memoryId);
        Task<IEnumerable<MemoryDTO>> GetAllMemoriesAsync();
        Task<IEnumerable<MemoryDTO>> GetMemoriesByIdAsync(int id);
        Task<IEnumerable<MemoryDTO>> GetMemoryByIdAsyncRecipyId(int id, int memoryId);
        Task UpdateMemoryAsync(int memoryId, MemoryDTO updatedMemoryDto);
    }
}