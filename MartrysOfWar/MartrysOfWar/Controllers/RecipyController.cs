using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MartrysOfWar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipyController : ControllerBase
    {
        // GET: api/<RecipyController>
        private IRecipyBL _recipyBL;
        public RecipyController(IRecipyBL recipyBL)
        {
            _recipyBL = recipyBL;
        }

        [HttpGet]
        public async Task<IEnumerable<RecipyDTO>> GetAllRecipies()
        {
            return await _recipyBL.GetAllRecipiesAsync();
        }



        [HttpGet("ById/{id}")]
        public async Task<ActionResult<IEnumerable<RecipyDTO>>> GetRecipyById(int id)
        {
            var recipies = await _recipyBL.GetRecipyById(id);

            if (recipies == null)
            {
                return NotFound(); // or return appropriate HTTP response for not found
            }

            return Ok(recipies);
        }

        [HttpGet("ByRecipeId/{recipeId}")]
        public async Task<ActionResult<IEnumerable<RecipyDTO>>> GetRecipyByRecipyId(int recipeId)
        {
            var recipies = await _recipyBL.GetRecipyByRecipyId(recipeId);

            if (recipies == null)
            {
                return NotFound(); // or return appropriate HTTP response for not found
            }

            return Ok(recipies);
        }



        [HttpPost]
        [Route("AddCompleteRecipe")]
        public async Task<ActionResult> AddCompleteRecipe([FromBody] CompleteRecipeDTO completeRecipeDto)
        {
            try
            {
                await _recipyBL.AddCompleteRecipeAsync(completeRecipeDto);
                return Ok("Recipe added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add recipe: {ex.Message}");
            }

        }

        // POST api/<PictureContoller>
        [HttpPost]
        public async Task<ActionResult> AddRecipy([FromBody] RecipyDTO recipyDTO)
        {
            await _recipyBL.AddRecipyAsync(recipyDTO);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpPut]
        [Route("UpdateCompleteRecipe")]
        public async Task<ActionResult> UpdateCompleteRecipe([FromBody] CompleteRecipeDTO completeRecipeDto)
        {
            try
            {
                await _recipyBL.UpdateCompleteRecipeAsync(completeRecipeDto);
                return Ok("Recipe updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to update recipe: {ex.Message}");
            }
        }



        [HttpDelete]
        [Route("DeleteCompleteRecipy/{id}")]
        public async Task<ActionResult> DeleteCompleteRecipe(int id)
        {
            try
            {
                await _recipyBL.DeleteCompleteRecipeAsync(id);
                return Ok("Recipe deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to delete recipe: {ex.Message}");
            }
        }

    }
}
