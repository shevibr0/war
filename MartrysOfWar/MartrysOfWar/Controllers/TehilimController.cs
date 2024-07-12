using BL;
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

        [HttpGet("GetTehilimBySoliderIdUser")]
        public async Task<ActionResult<TehilimDTO>> GetTehilimById([FromQuery] int id, [FromQuery] int soldier)
        {
            var tehilim = await _tehilimBL.GetTehilimBySoliderIdUserAsync(id, soldier);

            if (tehilim == null)
            {
                return NoContent();
            }

            return Ok(tehilim);
        }

        [HttpGet("GetCountTehilimForSolider/{soldier}")]
        public async Task<ActionResult<int>> GetCountTehilimForSolider(int soldier)
        {
            int count = await _tehilimBL.GetCountTehilimForSoliderAsync(soldier);
            return Ok(count);
        }

        [HttpGet("GetByUserCountTehilimForSolider/{soldier}")]
        public async Task<ActionResult<int>> GetByUserCountTehilimForSolider(int soldier)
        {
            int count = await _tehilimBL.GetByUserCountTehilimForSolider(soldier);
            return Ok(count);
        }
        [HttpGet("GetBooksCountForSolider/{soldier}")]
        public async Task<ActionResult<int>> GetBooksCountForSolider(int soldier)
        {
            int count = await _tehilimBL.GetBooksCountForSoliderAsync(soldier);
            return Ok(count);
        }

        [HttpGet("GetCompletedPsalms/{soldierId}")]
        public async Task<ActionResult<IEnumerable<int>>> GetCompletedPsalms(int soldierId)
        {
            var completedPsalms = await _tehilimBL.GetCompletedPsalmsAsync(soldierId);
            return Ok(completedPsalms);
        }

        //[HttpPost("AddCompletedPsalm")]
        //public async Task<ActionResult> AddCompletedPsalm([FromBody] CompletedPsalm completedPsalm)
        //{
        //    await _tehilimBL.AddCompletedPsalmAsync(completedPsalm);
        //    return Ok();

        //}
        [HttpPost("AddCompletedPsalm")]
        public async Task<ActionResult> AddCompletedPsalm([FromBody] CompletedPsalmDTO completedPsalmDto)
        {
            if (completedPsalmDto == null)
            {
                return BadRequest("Invalid data.");
            }

            try
            {
                await _tehilimBL.AddCompletedPsalmAsync(completedPsalmDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error saving CompletedPsalm: {ex.Message}");
            }
        }



        [HttpPost("UpdateBookCount/{soldierId}")]
        public async Task<ActionResult> UpdateBookCount(int soldierId)
        {
            await _tehilimBL.UpdateBookCountAsync(soldierId);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult<TehilimDTO>> AddTehilim([FromBody] TehilimDTO tehilimDto)
        {
            var addTehilim = await _tehilimBL.AddTehilimAsync(tehilimDto);
            return Ok(addTehilim);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTehilim(int id, [FromBody] TehilimDTO updatedTehilimDto)
        {
            await _tehilimBL.UpdateTehilimAsync(id, updatedTehilimDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTehilim(int id)
        {
            await _tehilimBL.DeleteTehilimAsync(id);
            return Ok();
        }

        [HttpDelete("DeleteCompletedPsalmsBySoldier/{soldierId}")]
        public async Task<ActionResult> DeleteCompletedPsalmsBySoldier(int soldierId)
        {
            try
            {
                await _tehilimBL.DeleteCompletedPsalmsBySoldierAsync(soldierId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting completed psalms: {ex.Message}");
            }
        }
        [HttpGet("GetCountCompletedPsalmsForSoldier/{soldierId}")]
        public async Task<ActionResult<int>> GetCountCompletedPsalmsForSoldier(int soldierId)
        {
            int count = await _tehilimBL.GetCountCompletedPsalmsForSoldierAsync(soldierId);
            return Ok(count);
        }


    }
}
