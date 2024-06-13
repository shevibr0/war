using Entities.DTO;

namespace BL
{
    public interface IRecipyBL
    {
        Task AddRecipyAsync(RecipyDTO recipyDTO);
        Task<IEnumerable<RecipyDTO>> GetAllRecipiesAsync();
        Task<IEnumerable<RecipyDTO>> GetRecipyById(int id);
        Task<IEnumerable<RecipyDTO>> GetRecipyByRecipyId(int recipeId);
        Task UpdateCompleteRecipeAsync(CompleteRecipeDTO completeRecipeDto);
        Task AddCompleteRecipeAsync(CompleteRecipeDTO completeRecipeDto);
        Task DeleteCompleteRecipeAsync(int recipeId);

    }
}