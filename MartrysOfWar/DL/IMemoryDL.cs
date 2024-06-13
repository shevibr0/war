using DL.Models;

namespace DL
{
    public interface IMemoryDL
    {
        Task AddMemoryAsync(Memory memory);
        Task DeleteMemoryAsync(int memoryId);
        Task<IEnumerable<Memory>> GetAllMemoriesAsync();
        Task<IEnumerable<Memory>> GetMemoryByIdAsyncRecipyId(int id, int memoryId);
        Task<IEnumerable<Memory>> GetMemoryByIdAsync(int id);
        Task UpdateMemoryAsync(int memoryId, Memory updatedMemory);
    }
}