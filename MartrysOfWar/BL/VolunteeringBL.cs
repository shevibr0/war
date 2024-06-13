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
    public class VolunteeringBL : IVolunteeringBL
    {
        private IVolunteeringDL _volunteeringDL;
        private IMapper _mapper;
        public VolunteeringBL(IVolunteeringDL volunteeringDL, IMapper mapper)
        {
            _mapper = mapper;
            _volunteeringDL = volunteeringDL;
        }
        public async Task<IEnumerable<VolunteeringDTO>> GetAllVolunteeringsAsync()
        {
            var volunteerings = await _volunteeringDL.GetAllVolunteeringsAsync();
            return _mapper.Map<IEnumerable<VolunteeringDTO>>(volunteerings);
        }
        public async Task<VolunteeringDTO> GetVolunteeringByIdAsync(int id)
        {
            var volunteering = await _volunteeringDL.GetVolunteeringByIdAsync(id);
            return _mapper.Map<VolunteeringDTO>(volunteering);
        }
        public async Task AddVolunteeringAsync(VolunteeringDTO volunteeringDTO)
        {
            var volunteering = _mapper.Map<Volunteering>(volunteeringDTO);
            await _volunteeringDL.AddVolunteeringAsync(volunteering);
        }
        public async Task UpdateVolunteeringAsync(int volunteeringId, VolunteeringDTO updatedVolunteeringDTO)
        {
            var updatedVolunteering = _mapper.Map<Volunteering>(updatedVolunteeringDTO);
            await _volunteeringDL.UpdateVolunteeringAsync(volunteeringId, updatedVolunteering);
        }
        public async Task DeleteVolunteeringAsync(int volunteeringId)
        {
            await _volunteeringDL.DeleteVolunteeringAsync(volunteeringId);
        }
    }
}
