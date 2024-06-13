using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MartrysOfWar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private IPictureBL _pictureBL;
        public PictureController(IPictureBL pictureBL)
        {
            _pictureBL = pictureBL;
        }
        // GET: api/<PictureContoller>
        [HttpGet]
        public async Task<IEnumerable<PictureDTO>> GetAllPictures()
        {
            return await _pictureBL.GetAllPicturesAsync();
        }
     

        // GET api/<PictureContoller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<PictureDTO>>> GetPictureById(int id)
        {
            var pictures = await _pictureBL.GetPictureByIdAsync(id);

            if (pictures == null)
            {
                return NotFound(); // or return appropriate HTTP response for not found
            }

            return Ok(pictures);
        }

        // POST api/<PictureContoller>
        [HttpPost]
        public async Task<ActionResult> AddPicture([FromBody] PictureDTO pictureDTO)
        {
            await _pictureBL.AddPictureAsync(pictureDTO);
            return Ok(); // or return appropriate HTTP response for success
        }

        // PUT api/<PictureContoller>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePicture(int id, [FromBody] PictureDTO updatedPictureDTO)
        {
            await _pictureBL.UpdatePictureAsync(id, updatedPictureDTO);
            return Ok(); // or return appropriate HTTP response for success
        }

        // DELETE api/<PictureContoller>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePicture(int id)
        {
            await _pictureBL.DeletePictureAsync(id);
            return Ok(); // or return appropriate HTTP response for success
        }
    }
}
