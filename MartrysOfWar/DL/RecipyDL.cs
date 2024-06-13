using DL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class RecipyDL : IRecipyDL
    {

        private MartyrsofwarContext _martyrsofwarContext = new MartyrsofwarContext();
        public async Task<IEnumerable<Recipy>> GetAllRecipiesAsync()
        {
            try
            {
                return await _martyrsofwarContext.Recipies.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IEnumerable<Recipy>> GetRecipyById(int id)
        {
             try
            {
                // מחזיר את כל המתכונים שעמודת ה-ID שלהם שווה ל-ID שהתקבל כפרמטר
                var recipies = await _martyrsofwarContext.Recipies
                    .Where(r => r.IdSoldier == id)
                    .Include(r => r.IdUserNavigation)
                    .ToListAsync();

                return recipies;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Recipy>> GetRecipyByRecipyId(int recipeId)
        {
            try
            {
                // מחזיר את כל המתכונים שעמודת ה-ID שלהם שווה ל-ID שהתקבל כפרמטר
                var recipies = await _martyrsofwarContext.Recipies
                    .Where(r => r.Id == recipeId)
                    .Include(r => r.IdUserNavigation)
                    .ToListAsync();

                return recipies;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddRecipyAsync(Recipy recipy)
        {
            _martyrsofwarContext.Recipies.Add(recipy);
            await _martyrsofwarContext.SaveChangesAsync();
        }


        public async Task AddPreparationAsync(int recipyId, Preparation preparation)
        {
            try
            {
                preparation.IdRec = recipyId; // הקשר למתכון
                _martyrsofwarContext.Preparations.Add(preparation);
                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddProductsToRecipeAsync(int recipyId, ProductsToRecipe productsToRecipe)
        {
            try
            {
                productsToRecipe.IdRec = recipyId; // הקשר למתכון
                _martyrsofwarContext.ProductsToRecipes.Add(productsToRecipe);
                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //public async Task AddRecipyAsync(Recipy recipy)
        //    {
        //        try
        //        {
        //            _martyrsofwarContext.Recipies.Add(recipy);
        //            await _martyrsofwarContext.SaveChangesAsync();
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //    }
        // עדכון מתכון
        public async Task UpdateRecipyAsync(Recipy recipy)
        {
            _martyrsofwarContext.Recipies.Update(recipy);
            await _martyrsofwarContext.SaveChangesAsync();
        }

        // עדכון הכנה
        public async Task UpdatePreparationAsync(Preparation preparation)
        {
            _martyrsofwarContext.Preparations.Update(preparation);
            await _martyrsofwarContext.SaveChangesAsync();
        }

        // עדכון מוצר למתכון
        public async Task UpdateProductsToRecipeAsync(ProductsToRecipe productsToRecipe)
        {
            _martyrsofwarContext.ProductsToRecipes.Update(productsToRecipe);
            await _martyrsofwarContext.SaveChangesAsync();
        }

        public async Task DeleteRecipeAsync(int recipeId)
        {
            var recipe = _martyrsofwarContext.Recipies.FirstOrDefault(r => r.Id == recipeId);
            if (recipe != null)
            {
                _martyrsofwarContext.Recipies.Remove(recipe);
                await _martyrsofwarContext.SaveChangesAsync();
            }
        }

        public async Task DeletePreparationsByRecipeIdAsync(int recipeId)
        {
            var preparations = _martyrsofwarContext.Preparations.Where(p => p.IdRec == recipeId).ToList();
            _martyrsofwarContext.Preparations.RemoveRange(preparations);
            await _martyrsofwarContext.SaveChangesAsync();
        }

        public async Task DeleteProductsToRecipeByRecipeIdAsync(int recipeId)
        {
            var products = _martyrsofwarContext.ProductsToRecipes.Where(p => p.IdRec == recipeId).ToList();
            _martyrsofwarContext.ProductsToRecipes.RemoveRange(products);
            await _martyrsofwarContext.SaveChangesAsync();
        }

    }
}

