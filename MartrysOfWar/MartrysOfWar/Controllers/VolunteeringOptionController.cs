using BL;
using DL;
using DL.Models;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MartrysOfWar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteeringOptionController : ControllerBase
    {
        private IVolunteeringOptionBL _volunteeringOptionBL;
        public VolunteeringOptionController(IVolunteeringOptionBL volunteeringOptionBL)
        {
            _volunteeringOptionBL = volunteeringOptionBL;
        }
        // GET: api/<MemoryController>
        [HttpGet]
        public async Task<IEnumerable<VolunteeringOptionDTO>> GetAllVolunteeringOption()
        {
            return await _volunteeringOptionBL.GetAllVolunteeringOptionsAsync();
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<VolunteeringOptionDTO>>> GetVolunteeringOptionById(int id)
        {
            var options = await _volunteeringOptionBL.GetVolunteeringOptionByIdAsync(id);

            if (options == null)
            {
                return NotFound(); // or return appropriate HTTP response for not found
            }

            return Ok(options);
        }


        [HttpGet("{id},{optionId}")]
        public async Task<ActionResult<IEnumerable<MemoryDTO>>> GetVolunteeringOptionByIdAsyncOptionId(int id, int optionId)
        {
            var options = await _volunteeringOptionBL.GetVolunteeringOptionByIdAsyncOptionId(id, optionId);

            if (options == null)
            {
                return NotFound(); // or return appropriate HTTP response for not found
            }

            return Ok(options);
        }



        [HttpPost]
        public async Task<ActionResult> AddVolunteeringOption([FromBody] VolunteeringOptionDTO volunteeringOptionDto)
        {
            await _volunteeringOptionBL.AddVolunteeringOptionAsync(volunteeringOptionDto);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateVolunteeringOption(int id, [FromBody] VolunteeringOptionDTO updatedVolunteeringOptionDto)
        {
            await _volunteeringOptionBL.UpdateVolunteeringOptionAsync(id, updatedVolunteeringOptionDto);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVolunteeringOption(int id)
        {
            await _volunteeringOptionBL.DeleteVolunteeringOptionAsync(id);
            return Ok(); // or return appropriate HTTP response for success
        }

    }
}
