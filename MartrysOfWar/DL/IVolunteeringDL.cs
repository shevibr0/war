using DL.Models;

namespace DL
{
    public interface IVolunteeringDL
    {
        Task AddVolunteeringAsync(Volunteering volunteering);
        Task DeleteVolunteeringAsync(int volunteeringId);
        Task<IEnumerable<Volunteering>> GetAllVolunteeringsAsync();
        Task<Volunteering> GetVolunteeringByIdAsync(int id);
        Task UpdateVolunteeringAsync(int volunteeringId, Volunteering updatedVolunteering);
    }
}