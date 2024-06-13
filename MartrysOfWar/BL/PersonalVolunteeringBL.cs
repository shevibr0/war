using AutoMapper;
using DL.Models;
using DL;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class PersonalVolunteeringBL : IPersonalVolunteeringBL
    {
        private IPersonalVolunteeringDL _personalVolunteeringDL;
        private IMapper _mapper;
        public PersonalVolunteeringBL(IPersonalVolunteeringDL personalVolunteeringDL, IMapper mapper)
        {
            _mapper = mapper;
            _personalVolunteeringDL = personalVolunteeringDL;
        }
        public async Task<IEnumerable<PersonalVolunteeringDTO>> GetAllPersonalVolunteeringsAsync()
        {
            var personalVolunteerings = await _personalVolunteeringDL.GetAllPersonalVolunteeringsAsync();
            return _mapper.Map<IEnumerable<PersonalVolunteeringDTO>>(personalVolunteerings);
        }
        public async Task<PersonalVolunteeringDTO> GetPersonalVolunteeringByIdAsync(int id)
        {
            var personalVolunteering = await _personalVolunteeringDL.GetPersonalVolunteeringByIdAsync(id);
            return _mapper.Map<PersonalVolunteeringDTO>(personalVolunteering);
        }
        public async Task AddPersonalVolunteeringAsync(PersonalVolunteeringDTO personalVolunteeringDTO)
        {
            var personalVolunteering = _mapper.Map<PersonalVolunteering>(personalVolunteeringDTO);
            await _personalVolunteeringDL.AddPersonalVolunteeringAsync(personalVolunteering);
        }
        public async Task UpdatePersonalVolunteeringAsync(int personalVolunteeringId, PersonalVolunteeringDTO updatedPersonalVolunteeringDTO)
        {
            var updatedPersonalVolunteering = _mapper.Map<PersonalVolunteering>(updatedPersonalVolunteeringDTO);
            await _personalVolunteeringDL.UpdatePersonalVolunteeringAsync(personalVolunteeringId, updatedPersonalVolunteering);
        }
        public async Task DeletePersonalVolunteeringAsync(int personalVolunteeringId)
        {
            await _personalVolunteeringDL.DeletePersonalVolunteeringAsync(personalVolunteeringId);
        }
    }
}
