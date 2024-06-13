using Entities.DTO;

namespace BL
{
    public interface IProductsToRecipeBL
    {
        //Task AddProductsToRecipeAsync(ProductsToRecipeDTO productsToRecipeDTO);
        Task DeleteProductsToRecipeAsync(int productsToRecipeId);
        Task<IEnumerable<ProductsToRecipeDTO>> GetAllProductsToRecipeAsync();
        Task<ProductsToRecipeDTO> GetProductsToRecipeByIdAsync(int id);
        Task UpdateProductsToRecipeAsync(int productsToRecipeId, ProductsToRecipeDTO updatedProductsToRecipeDTO);
    }
}