using DL.Models;

namespace DL
{
    public interface IPersonalVolunteeringDL
    {
        Task AddPersonalVolunteeringAsync(PersonalVolunteering personalVolunteering);
        Task DeletePersonalVolunteeringAsync(int personalVolunteeringId);
        Task<IEnumerable<PersonalVolunteering>> GetAllPersonalVolunteeringsAsync();
        Task<PersonalVolunteering> GetPersonalVolunteeringByIdAsync(int id);
        Task UpdatePersonalVolunteeringAsync(int personalVolunteeringId, PersonalVolunteering updatedPersonalVolunteering);
    }
}