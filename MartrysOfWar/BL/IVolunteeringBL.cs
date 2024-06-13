using Entities.DTO;

namespace BL
{
    public interface IVolunteeringBL
    {
        Task AddVolunteeringAsync(VolunteeringDTO volunteeringDTO);
        Task DeleteVolunteeringAsync(int volunteeringId);
        Task<IEnumerable<VolunteeringDTO>> GetAllVolunteeringsAsync();
        Task<VolunteeringDTO> GetVolunteeringByIdAsync(int id);
        Task UpdateVolunteeringAsync(int volunteeringId, VolunteeringDTO updatedVolunteeringDTO);
    }
}