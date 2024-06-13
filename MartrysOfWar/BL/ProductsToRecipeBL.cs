using AutoMapper;
using DL.Models;
using DL;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ProductsToRecipeBL : IProductsToRecipeBL
    {

        private IProductsToRecipeDL _productsToRecipeDL;
        private IMapper _mapper;
        public ProductsToRecipeBL(IProductsToRecipeDL productsToRecipeDL, IMapper mapper)
        {
            _mapper = mapper;
            _productsToRecipeDL = productsToRecipeDL;
        }
        public async Task<IEnumerable<ProductsToRecipeDTO>> GetAllProductsToRecipeAsync()
        {
            var ProductsToRecipes = await _productsToRecipeDL.GetAllProductsToRecipesAsync();
            return _mapper.Map<IEnumerable<ProductsToRecipeDTO>>(ProductsToRecipes);
        }
        public async Task<ProductsToRecipeDTO> GetProductsToRecipeByIdAsync(int id)
        {
            var picture = await _productsToRecipeDL.GetProductsToRecipeByIdAsync(id);
            return _mapper.Map<ProductsToRecipeDTO>(picture);
        }
        //public async Task AddProductsToRecipeAsync(ProductsToRecipeDTO productsToRecipeDTO)
        //{
        //    var productsToRecipe = _mapper.Map<ProductsToRecipe>(productsToRecipeDTO);
        //    await _productsToRecipeDL.AddProductsToRecipeAsync(productsToRecipe);
        //}
        public async Task UpdateProductsToRecipeAsync(int productsToRecipeId, ProductsToRecipeDTO updatedProductsToRecipeDTO)
        {
            var updatedProductsToRecipe = _mapper.Map<ProductsToRecipe>(updatedProductsToRecipeDTO);
            await _productsToRecipeDL.UpdateProductsToRecipeAsync(productsToRecipeId, updatedProductsToRecipe);
        }
        public async Task DeleteProductsToRecipeAsync(int productsToRecipeId)
        {
            await _productsToRecipeDL.DeleteProductsToRecipeAsync(productsToRecipeId);
        }
    }
}
