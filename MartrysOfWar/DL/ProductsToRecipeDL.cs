using DL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class ProductsToRecipeDL :IProductsToRecipeDL
    {
        private MartyrsofwarContext _martyrsofwarContext = new MartyrsofwarContext();
        public async Task<IEnumerable<ProductsToRecipe>> GetAllProductsToRecipesAsync()
        {
            try
            {
                return await _martyrsofwarContext.ProductsToRecipes.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ProductsToRecipe> GetProductsToRecipeByIdAsync(int id)
        {
            try
            {
                return await _martyrsofwarContext.ProductsToRecipes.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public async Task AddProductsToRecipeAsync(ProductsToRecipe productsToRecipe)
        //{
        //    try
        //    {
        //        _martyrsofwarContext.ProductsToRecipes.Add(productsToRecipe);
        //        await _martyrsofwarContext.SaveChangesAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        public async Task UpdateProductsToRecipeAsync(int productsToRecipeId, ProductsToRecipe updatedProductsToRecipe)
        {
            try
            {
                var existingProductsToRecipe = await _martyrsofwarContext.ProductsToRecipes.FindAsync(productsToRecipeId);

                if (existingProductsToRecipe != null)
                {
                    _martyrsofwarContext.Entry(existingProductsToRecipe).CurrentValues.SetValues(updatedProductsToRecipe);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
                // Handle case where user with the specified ID is not found
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task DeleteProductsToRecipeAsync(int productsToRecipeId)
        {
            try
            {
                var productsToRecipeToDelete = await _martyrsofwarContext.ProductsToRecipes.FindAsync(productsToRecipeId);

                if (productsToRecipeToDelete != null)
                {
                    _martyrsofwarContext.ProductsToRecipes.Remove(productsToRecipeToDelete);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
                // Handle case where user with the specified ID is not found
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public Task AddProductsToRecipeAsync(int newRecipyId, ProductsToRecipe productToRecipe)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
