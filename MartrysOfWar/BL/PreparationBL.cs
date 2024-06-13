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
    public class PreparationBL : IPreparationBL
    {
        private IPreparationDL _preparationDL;
        private IMapper _mapper;
        public PreparationBL(IPreparationDL preparationDL, IMapper mapper)
        {
            _mapper = mapper;
            _preparationDL = preparationDL;
        }
        public async Task<IEnumerable<PreparationDTO>> GetAllPreparationsAsync()
        {
            var preparations = await _preparationDL.GetAllPreparationsAsync();
            return _mapper.Map<IEnumerable<PreparationDTO>>(preparations);
        }
        public async Task<PreparationDTO> GetPreparationByIdAsync(int id)
        {
            var picture = await _preparationDL.GetPreparationByIdAsync(id);
            return _mapper.Map<PreparationDTO>(picture);
        }
        //public async Task AddPreparationAsync(PreparationDTO preparationDTO)
        //{
        //    var preparation = _mapper.Map<Preparation>(preparationDTO);
        //    await _preparationDL.AddPreparationAsync(preparation);
        //}
        public async Task UpdatePreparationAsync(int preparationId, PreparationDTO updatedPreparationDTO)
        {
            var updatedPreparation = _mapper.Map<Preparation>(updatedPreparationDTO);
            await _preparationDL.UpdatePreparationAsync(preparationId, updatedPreparation);
        }
        public async Task DeletePreparationAsync(int preparationId)
        {
            await _preparationDL.DeletePreparationAsync(preparationId);
        }
    }
}
