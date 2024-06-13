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
    public class TehilimBL : ITehilimBL
    {

        private ITehilimDL _tehilimDL;
        private IMapper _mapper;

        public TehilimBL(ITehilimDL tehilimDL, IMapper mapper)
        {
            _mapper = mapper;
            _tehilimDL = tehilimDL;
        }

        public async Task<IEnumerable<TehilimDTO>> GetAllTehilimsAsync()
        {
            var tehilims = await _tehilimDL.GetAllTehilimsAsync();
            return _mapper.Map<IEnumerable<TehilimDTO>>(tehilims);
        }
       
        public async Task<TehilimDTO> AddTehilimAsync(TehilimDTO tehilimDTO)
        {
            var tehilim = _mapper.Map<Tehilim>(tehilimDTO);
            var tehilimDTO1 = await _tehilimDL.AddTehilimAsync(tehilim);
            return _mapper.Map<TehilimDTO>(tehilimDTO1);
        }
        public async Task UpdateTehilimAsync(int tehilimId, TehilimDTO updatedTehilimDTO)
        {
            var updatedTehilim = _mapper.Map<Tehilim>(updatedTehilimDTO);
            await _tehilimDL.UpdateTehilimAsync(tehilimId, updatedTehilim);
        }
        public async Task DeleteTehilimAsync(int TehilimId)
        {
            await _tehilimDL.DeleteTehilimAsync(TehilimId);
        }

        public async Task<TehilimDTO> GetTehilimBySoliderIdUserAsync(int userId, int soliderId)
        {
                var tehilim = await _tehilimDL.GetTehilimBySoliderIdUserAsync(userId, soliderId);
                return _mapper.Map<TehilimDTO>(tehilim);
        }

        public async Task<int> GetCountTehilimForSoliderAsync(int soliderId)
        {
            return await _tehilimDL.GetCountTehilimForSoliderAsync(soliderId);
        }

        public async Task<int> GetByUserCountTehilimForSolider(int soliderId)
        {
            return await _tehilimDL.GetByUserCountTehilimForSolider(soliderId);
        }
    }
}
