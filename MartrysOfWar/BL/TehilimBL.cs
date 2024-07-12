using AutoMapper;
using DL.Models;
using DL;
using Entities.DTO;


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

        public async Task DeleteTehilimAsync(int tehilimId)
        {
            await _tehilimDL.DeleteTehilimAsync(tehilimId);
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

        public async Task<int> GetBooksCountForSoliderAsync(int soliderId)
        {
            return await _tehilimDL.GetBooksCountForSoliderAsync(soliderId);
        }

        public async Task<IEnumerable<int>> GetCompletedPsalmsAsync(int soldierId)
        {
            return await _tehilimDL.GetCompletedPsalmsAsync(soldierId);
        }

        public async Task AddCompletedPsalmAsync(CompletedPsalmDTO completedPsalmDto)
        {
            var completedPsalm = new CompletedPsalm
            {
                IdSoldier = completedPsalmDto.IdSoldier,
                IdUser = completedPsalmDto.IdUser,
                PsalmNumber = completedPsalmDto.PsalmNumber
            };

            await _tehilimDL.AddCompletedPsalmAsync(completedPsalm);

            // בדיקת האם כל הפרקים נלחצו
            bool areAllPsalmsCompleted = await _tehilimDL.AreAllPsalmsCompleted(completedPsalmDto.IdSoldier);

            if (areAllPsalmsCompleted)
            {
                // עדכון ספירת הספרים וניקוי CompletedPsalms
                await _tehilimDL.UpdateBookCountIfNeeded(completedPsalmDto.IdSoldier);
                await _tehilimDL.ClearCompletedPsalmsForSoldier(completedPsalmDto.IdSoldier);
            }
        }

        public async Task UpdateBookCountAsync(int soldierId)
        {
            await _tehilimDL.UpdateBookCountIfNeeded(soldierId);
        }

        public async Task ClearCompletedPsalmsForSoldierAsync(int soldierId)
        {
            await _tehilimDL.ClearCompletedPsalmsForSoldier(soldierId);
        }

        public async Task<bool> AreAllPsalmsCompletedAsync(int soldierId)
        {
            return await _tehilimDL.AreAllPsalmsCompleted(soldierId);
        }

        public async Task DeleteCompletedPsalmsBySoldierAsync(int soldierId)
        {
            await _tehilimDL.DeleteCompletedPsalmsBySoldierAsync(soldierId);
        }
        public async Task<int> GetCountCompletedPsalmsForSoldierAsync(int soldierId)
        {
            return await _tehilimDL.GetCountCompletedPsalmsForSoldierAsync(soldierId);
        }

    }
}
