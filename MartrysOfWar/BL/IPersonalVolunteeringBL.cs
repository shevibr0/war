using Entities.DTO;

namespace BL
{
    public interface IPersonalVolunteeringBL
    {
        Task AddPersonalVolunteeringAsync(PersonalVolunteeringDTO personalVolunteeringDTO);
        Task DeletePersonalVolunteeringAsync(int personalVolunteeringId);
        Task<IEnumerable<PersonalVolunteeringDTO>> GetAllPersonalVolunteeringsAsync();
        Task<PersonalVolunteeringDTO> GetPersonalVolunteeringByIdAsync(int id);
        Task UpdatePersonalVolunteeringAsync(int personalVolunteeringId, PersonalVolunteeringDTO updatedPersonalVolunteeringDTO);
    }
}