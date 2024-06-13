using DL.Models;

namespace DL
{
    public interface IRecipyDL
    {
        Task AddRecipyAsync(Recipy recipy);
        Task AddPreparationAsync(int recipyId, Preparation preparation);
        Task AddProductsToRecipeAsync(int recipyId, ProductsToRecipe productsToRecipe);
        Task DeleteProductsToRecipeByRecipeIdAsync(int recipeId);
        Task DeletePreparationsByRecipeIdAsync(int recipeId);
        Task DeleteRecipeAsync(int recipeId);
        Task<IEnumerable<Recipy>> GetAllRecipiesAsync();
        Task<IEnumerable<Recipy>> GetRecipyById(int id);
        Task<IEnumerable<Recipy>> GetRecipyByRecipyId(int recipeId);
        Task UpdateRecipyAsync(Recipy recipy);
        Task UpdatePreparationAsync(Preparation preparation);
        Task UpdateProductsToRecipeAsync(ProductsToRecipe productsToRecipe);

    }
}