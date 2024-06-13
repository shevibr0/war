using Entities.DTO;

namespace BL
{
    public interface IPreparationBL
    {
        //Task AddPreparationAsync(PreparationDTO preparationDTO);
        Task DeletePreparationAsync(int preparationId);
        Task<IEnumerable<PreparationDTO>> GetAllPreparationsAsync();
        Task<PreparationDTO> GetPreparationByIdAsync(int id);
        Task UpdatePreparationAsync(int preparationId, PreparationDTO updatedPreparationDTO);
    }
}