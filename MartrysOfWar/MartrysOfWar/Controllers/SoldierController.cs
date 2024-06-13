using BL;
using DL;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MartrysOfWar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoldierController : ControllerBase
    {
        private ISoldierBL _soldierBL;
        public SoldierController(ISoldierBL soldierBL)
        {
            _soldierBL = soldierBL;
        }

        // GET: api/<SoldierController>
        [HttpGet]
        [Route("GetSolidersByPage")]
        public async Task<IEnumerable<SoldierDTO>> GetAllSoldiers([FromQuery]int page)
        {
            return await _soldierBL.GetAllSoldiersAsync(page);
        }

        // GET: api/<SoldierController>
        [HttpGet]
        [Route("GetCountSoliders")]
        public int GetCountSoliders()
        {
            return _soldierBL.GetCountSoliders();
        }

        // GET api/<SoldierController>/5
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<SoldierDTO>> GetSoldierById(int id)
        {
            var soldier = await _soldierBL.GetSoldierByIdAsync(id);

            if (soldier == null)
            {
                return NotFound(); // or return appropriate HTTP response for not found
            }

            return Ok(soldier);
        }


        // POST api/<SoldierController>
        [HttpPost]
        public async Task<ActionResult> AddSoldier([FromBody] SoldierDTO soldierDTO)
        {
            await _soldierBL.AddSoldierAsync(soldierDTO);
            return Ok(); // or return appropriate HTTP response for success
        }


        // PUT api/<SoldierController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSoldier(int id, [FromBody] SoldierDTO updatedSoldierDTO)
        {
            await _soldierBL.UpdateSoldierAsync(id, updatedSoldierDTO);
            return Ok(); // or return appropriate HTTP response for success
        }

        // DELETE api/<SoldierController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSoldier(int id)
        {
            await _soldierBL.DeleteSoldierAsync(id);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpGet]
        [Route("GlobalSearchSoldiers")]
        public async Task<ActionResult<IEnumerable<SoldierDTO>>> GlobalSearchSoldiers([FromQuery] string searchValue, [FromQuery] int page)
        {
            try
            {
                var result = await _soldierBL.GlobalSearchSoldiersAsync(searchValue, page);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
