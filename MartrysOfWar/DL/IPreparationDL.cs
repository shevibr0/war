using DL.Models;

namespace DL
{
    public interface IPreparationDL
    {
        Task AddPreparationAsync(int recipeId, Preparation preparation);
        Task DeletePreparationAsync(int preparationId);
        Task<IEnumerable<Preparation>> GetAllPreparationsAsync();
        Task<Preparation> GetPreparationByIdAsync(int id);
        Task UpdatePreparationAsync(int preparationId, Preparation updatedPreparation);
    }
}