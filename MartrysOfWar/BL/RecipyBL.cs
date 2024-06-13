using AutoMapper;
using DL.Models;
using DL;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace BL
{
    public class RecipyBL : IRecipyBL
    {
        private IRecipyDL _recipyDL;
        private IMapper _mapper;
        private IRecipyDL _productsToRecipeDL;
        private IRecipyDL _preparationDL;
        public RecipyBL(IRecipyDL recipyDL, IRecipyDL productsToRecipeDL, IRecipyDL preparationDL, IMapper mapper)
        {
            _recipyDL = recipyDL;
            _productsToRecipeDL = productsToRecipeDL;
            _preparationDL = preparationDL;
            _mapper = mapper;
        }
        public async Task<IEnumerable<RecipyDTO>> GetAllRecipiesAsync()
        {
            var recipies = await _recipyDL.GetAllRecipiesAsync();
            return _mapper.Map<IEnumerable<RecipyDTO>>(recipies);
        }

        public async Task<IEnumerable<RecipyDTO>> GetRecipyById(int id)
        {
            var recipies = await _recipyDL.GetRecipyById(id);
            return _mapper.Map<IEnumerable<RecipyDTO>>(recipies);
        }


        public async Task<IEnumerable<RecipyDTO>> GetRecipyByRecipyId(int recipeId)
        {
            var recipies = await _recipyDL.GetRecipyByRecipyId(recipeId);
            return _mapper.Map<IEnumerable<RecipyDTO>>(recipies);
        }
        public async Task AddRecipyAsync(RecipyDTO recipyDTO)
        {
            var recipy = _mapper.Map<Recipy>(recipyDTO);
            await _recipyDL.AddRecipyAsync(recipy);
        }
        public async Task AddCompleteRecipeAsync(CompleteRecipeDTO completeRecipeDto)
        {
            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    var recipy = _mapper.Map(completeRecipeDto.Recipy, typeof(RecipyDTO), typeof(Recipy));
                    await _recipyDL.AddRecipyAsync((Recipy)recipy);

                    int newRecipyId = ((Recipy)recipy).Id;

                    foreach (var preparationDto in completeRecipeDto.Preparations)
                    {

                        var preparation = _mapper.Map<Preparation>(preparationDto);
                        preparation.IdRec = newRecipyId; // הקשר למתכון
                        await _preparationDL.AddPreparationAsync(newRecipyId, preparation);
                    }

                    foreach (var productToRecipeDto in completeRecipeDto.ProductsToRecipes)
                    {
                        var productToRecipe = _mapper.Map<ProductsToRecipe>(productToRecipeDto);
                        productToRecipe.IdRec = newRecipyId;
                        await _productsToRecipeDL.AddProductsToRecipeAsync(newRecipyId, productToRecipe);
                    }
                    transaction.Complete();
                }
                catch (Exception ex)
                {
                    throw new Exception("Failed to complete the transaction for adding a recipe", ex);
                }
            }
        }


        public async Task UpdateCompleteRecipeAsync(CompleteRecipeDTO completeRecipeDto)
        {
            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    var recipy = _mapper.Map<Recipy>(completeRecipeDto.Recipy);
                    await _recipyDL.UpdateRecipyAsync(recipy);

                    foreach (var preparationDto in completeRecipeDto.Preparations)
                    {
                        var preparation = _mapper.Map<Preparation>(preparationDto);
                        await _preparationDL.UpdatePreparationAsync(preparation);
                    }

                    foreach (var productToRecipeDto in completeRecipeDto.ProductsToRecipes)
                    {
                        var productToRecipe = _mapper.Map<ProductsToRecipe>(productToRecipeDto);
                        await _productsToRecipeDL.UpdateProductsToRecipeAsync(productToRecipe);
                    }

                    transaction.Complete();
                }
                catch (Exception ex)
                {
                    throw new Exception("Failed to complete the transaction for updating a recipe", ex);
                }
            }
        }


        public async Task DeleteCompleteRecipeAsync(int recipeId)
        {
            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    await _productsToRecipeDL.DeleteProductsToRecipeByRecipeIdAsync(recipeId);
                    await _preparationDL.DeletePreparationsByRecipeIdAsync(recipeId);
                    await _recipyDL.DeleteRecipeAsync(recipeId);

                    transaction.Complete(); // Only commit if all deletions are successful
                }
                catch (Exception ex)
                {
                    throw new Exception($"Failed to delete recipe with ID {recipeId}", ex);
                }
            }
        }

    }
}
