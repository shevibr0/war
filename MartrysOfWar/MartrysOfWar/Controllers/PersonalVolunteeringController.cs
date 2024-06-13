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
    public class PersonalVolunteeringController : ControllerBase
    {
        private IPersonalVolunteeringBL _personalVolunteeringBL;
        public PersonalVolunteeringController(IPersonalVolunteeringBL personalVolunteeringBL)
        {
            _personalVolunteeringBL = personalVolunteeringBL;
        }
        // GET: api/<MemoryController>
        [HttpGet]
        public async Task<IEnumerable<PersonalVolunteeringDTO>> GetAllPersonalVolunteerings()
        {
            return await _personalVolunteeringBL.GetAllPersonalVolunteeringsAsync();
        }

        // GET api/<MemoryController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonalVolunteeringDTO>> GetPersonalVolunteeringById(int id)
        {
            var personalVolunteering = await _personalVolunteeringBL.GetPersonalVolunteeringByIdAsync(id);

            if (personalVolunteering == null)
            {
                return NotFound(); // or return appropriate HTTP response for not found
            }

            return Ok(personalVolunteering);
        }

        [HttpPost]
        public async Task<ActionResult> AddPersonalVolunteering([FromBody] PersonalVolunteeringDTO personalVolunteeringDto)
        {
            await _personalVolunteeringBL.AddPersonalVolunteeringAsync(personalVolunteeringDto);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePersonalVolunteering(int id, [FromBody] PersonalVolunteeringDTO updatedPersonalVolunteeringDto)
        {
            await _personalVolunteeringBL.UpdatePersonalVolunteeringAsync(id, updatedPersonalVolunteeringDto);
            return Ok(); // or return appropriate HTTP response for success
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePersonalVolunteering(int id)
        {
            await _personalVolunteeringBL.DeletePersonalVolunteeringAsync(id);
            return Ok(); // or return appropriate HTTP response for success
        }
    }
}