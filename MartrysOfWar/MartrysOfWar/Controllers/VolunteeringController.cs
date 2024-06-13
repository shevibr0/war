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
    public class VolunteeringController : ControllerBase
    {
       private IVolunteeringBL _volunteeringBL;
        public VolunteeringController(IVolunteeringBL volunteeringBL)
        {
            _volunteeringBL = volunteeringBL;
        }
        // GET: api/<MemoryController>
        [HttpGet]
        public async Task<IEnumerable<VolunteeringDTO>> GetAllVolunteering()
        {
            return await _volunteeringBL.GetAllVolunteeringsAsync();
        }

        // GET api/<MemoryController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VolunteeringDTO>> GetVolunteeringById(int id)
        {
            var volunteering = await _volunteeringBL.GetVolunteeringByIdAsync(id);

            if (volunteering == null)
            {
                return NotFound(); // or return appropriate HTTP response for not found
            }

            return Ok(volunteering);
        }

        [HttpPost]
        public async Task<ActionResult> AddVolunteering([FromBody] VolunteeringDTO volunteeringDto)
        {
            await _volunteeringBL.AddVolunteeringAsync(volunteeringDto);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateVolunteering(int id, [FromBody] VolunteeringDTO updatedVolunteeringDto)
        {
            await _volunteeringBL.UpdateVolunteeringAsync(id, updatedVolunteeringDto);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVolunteering(int id)
        {
            await _volunteeringBL.DeleteVolunteeringAsync(id);
            return Ok(); // or return appropriate HTTP response for success
        }
    
    }
}
