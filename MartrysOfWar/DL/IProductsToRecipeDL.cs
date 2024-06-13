using DL.Models;

namespace DL
{
    public interface IProductsToRecipeDL
    {
        //Task AddProductsToRecipeAsync(int newRecipyId, ProductsToRecipe productToRecipe);
        Task DeleteProductsToRecipeAsync(int productsToRecipeId);
        Task<IEnumerable<ProductsToRecipe>> GetAllProductsToRecipesAsync();
        Task<ProductsToRecipe> GetProductsToRecipeByIdAsync(int id);
        Task UpdateProductsToRecipeAsync(int productsToRecipeId, ProductsToRecipe updatedProductsToRecipe);
    }
}