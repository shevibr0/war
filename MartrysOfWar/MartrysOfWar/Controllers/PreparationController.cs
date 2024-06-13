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
    public class PreparationController : ControllerBase
    {
        private IPreparationBL _preparationBL;
        public PreparationController(IPreparationBL preparationBL)
        {
            _preparationBL = preparationBL;
        }
        // GET: api/<MemoryController>
        [HttpGet]
        public async Task<IEnumerable<PreparationDTO>> GetAllPreparations()
        {
            return await _preparationBL.GetAllPreparationsAsync();
        }

        // GET api/<MemoryController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PreparationDTO>> GetPreparationById(int id)
        {
            var preparation = await _preparationBL.GetPreparationByIdAsync(id);

            if (preparation == null)
            {
                return NotFound(); // or return appropriate HTTP response for not found
            }

            return Ok(preparation);
        }

        [HttpPost]
        //public async Task<ActionResult> AddPreparation([FromBody] PreparationDTO preparationDto)
        //{
        //    await _preparationBL.AddPreparationAsync(preparationDto);
        //    return Ok(); // or return appropriate HTTP response for success
        //}

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePreparation(int id, [FromBody] PreparationDTO updatedPreparationDto)
        {
            await _preparationBL.UpdatePreparationAsync(id, updatedPreparationDto);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePreparation(int id)
        {
            await _preparationBL.DeletePreparationAsync(id);
            return Ok(); // or return appropriate HTTP response for success
        }
    }
}
