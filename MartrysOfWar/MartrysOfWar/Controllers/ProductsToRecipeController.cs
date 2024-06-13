using BL;
using DL;
using DL.Models;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MartrysOfWar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsToRecipeController : ControllerBase
    {
        private IProductsToRecipeBL _productsToRecipeBL;
        public ProductsToRecipeController(IProductsToRecipeBL productsToRecipeBL)
        {
            _productsToRecipeBL = productsToRecipeBL;
        }
        // GET: api/<MemoryController>
        [HttpGet]
        public async Task<IEnumerable<ProductsToRecipeDTO>> GetAllProductsToRecipes()
        {
            return await _productsToRecipeBL.GetAllProductsToRecipeAsync();
        }

        // GET api/<MemoryController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductsToRecipeDTO>> GetProductsToRecipeById(int id)
        {
            var productsToRecipe = await _productsToRecipeBL.GetProductsToRecipeByIdAsync(id);

            if (productsToRecipe == null)
            {
                return NotFound(); // or return appropriate HTTP response for not found
            }

            return Ok(productsToRecipe);
        }

        //[HttpPost]
        //public async Task<ActionResult> AddProductsToRecipe([FromBody] ProductsToRecipeDTO productsToRecipeDto)
        //{
        //    await _productsToRecipeBL.AddProductsToRecipeAsync(productsToRecipeDto);
        //    return Ok(); // or return appropriate HTTP response for success
        //}

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProductsToRecipe(int id, [FromBody] ProductsToRecipeDTO updatedProductsToRecipeDto)
        {
            await _productsToRecipeBL.UpdateProductsToRecipeAsync(id, updatedProductsToRecipeDto);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProductsToRecipe(int id)
        {
            await _productsToRecipeBL.DeleteProductsToRecipeAsync(id);
            return Ok(); // or return appropriate HTTP response for success
        }

    }
}
