using DL.Models;

namespace DL
{
    public interface IVolunteeringOptionDL
    {
        Task AddVolunteeringOptionAsync(VolunteeringOption VolunteeringOption);

        Task DeleteVolunteeringOptionAsync(int volunteeringOptionId);
        Task<IEnumerable<VolunteeringOption>> GetAllVolunteeringOptionsAsync();
        Task<IEnumerable<VolunteeringOption>> GetVolunteeringOptionByIdAsyncOptionId(int id, int optionId);
        Task<IEnumerable<VolunteeringOption>> GetVolunteeringOptionByIdAsync(int id);
        Task UpdateVolunteeringOptionAsync(int volunteeringOptionId, VolunteeringOption updatedVolunteeringOption);
    }
}