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
    public class TehilimController : ControllerBase
    {
        private ITehilimBL _tehilimBL;
        public TehilimController(ITehilimBL tehilimBL)
        {
            _tehilimBL = tehilimBL;
        }
        // GET: api/<MemoryController>
        [HttpGet]
        public async Task<IEnumerable<TehilimDTO>> GetAllTehilims()
        {
            return await _tehilimBL.GetAllTehilimsAsync();
        }

        // GET api/<MemoryController>/5
        [HttpGet("GetTehilimBySoliderIdUser")]
        public async Task<ActionResult<TehilimDTO>> GetTehilimById([FromQuery]int id,[FromQuery] int soldier)
        {
            var tehilim = await _tehilimBL.GetTehilimBySoliderIdUserAsync(id, soldier);

            if (tehilim == null)
            {
                return NoContent(); // or return appropriate HTTP response for not found
            }

            return Ok(tehilim);
        }

        // GET api/<MemoryController>/5
        [HttpGet("GetCountTehilimForSolider/{soldier}")]
        public async Task<ActionResult<int>> GetCountTehilimForSolider(int soldier)
        {
            int count = await _tehilimBL.GetCountTehilimForSoliderAsync(soldier);

            return Ok(count);
        }


        // GET api/<MemoryController>/5
        [HttpGet("GetByUserCountTehilimForSolider/{soldier}")]
        public async Task<ActionResult<int>> GetByUserCountTehilimForSolider(int soldier)
        {
            int count = await _tehilimBL.GetByUserCountTehilimForSolider(soldier);

            return Ok(count);
        }

        [HttpPost]
        public async Task<ActionResult<TehilimDTO>> AddTehilim([FromBody] TehilimDTO tehilimDto)
        {
            var addTehilim = await _tehilimBL.AddTehilimAsync(tehilimDto);
            return Ok(addTehilim); // or return appropriate HTTP response for success
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTehilim(int id, [FromBody] TehilimDTO updatedTehilimDto)
        {
            await _tehilimBL.UpdateTehilimAsync(id, updatedTehilimDto);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTehilim(int id)
        {
            await _tehilimBL.DeleteTehilimAsync(id);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpPost("UpdateBookCount/{soldierId}")]
        public async Task<IActionResult> UpdateBookCount(int soldierId)
        {
            await _tehilimBL.UpdateBookCountAsync(soldierId);
            return Ok();
        }

        [HttpGet("BookCount/{soldierId}")]
        public async Task<ActionResult<int>> GetBookCount(int soldierId)
        {
            var count = await _tehilimBL.GetBookCountAsync(soldierId);
            return Ok(count);
        }
        [HttpGet("GetBooksCountForSolider/{soldier}")]
        public async Task<ActionResult<int>> GetBooksCountForSolider(int soldier)
        {
            int count = await _tehilimBL.GetBooksCountForSoliderAsync(soldier);
            return Ok(count);
        }

    }
}
