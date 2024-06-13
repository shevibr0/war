using AutoMapper;
using DL;
using DL.Models;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class PictureBL : IPictureBL
    {
        private IPictureDL _pictureDL;
        private IMapper _mapper;
        public PictureBL(IPictureDL pictureDL, IMapper mapper)
        {
            _mapper = mapper;
            _pictureDL = pictureDL;
        }
        public async Task<IEnumerable<PictureDTO>> GetAllPicturesAsync()
        {
            var pictures = await _pictureDL.GetAllPicturesAsync();
            return _mapper.Map<IEnumerable<PictureDTO>>(pictures);
        }
        public async Task<IEnumerable<PictureDTO>> GetPictureByIdAsync(int id)
        {
            var pictures = await _pictureDL.GetPictureByIdAsync(id);
            return _mapper.Map<IEnumerable<PictureDTO>>(pictures);
        }
       
        public async Task AddPictureAsync(PictureDTO pictureDTO)
        {
            var picture = _mapper.Map<Picture>(pictureDTO);
            await _pictureDL.AddPictureAsync(picture);
        }
        public async Task UpdatePictureAsync(int pictureId, PictureDTO updatedPictureDTO)
        {
            var updatedPicture = _mapper.Map<Picture>(updatedPictureDTO);
            await _pictureDL.UpdatePictureAsync(pictureId, updatedPicture);
        }
        public async Task DeletePictureAsync(int pictureId)
        {
            await _pictureDL.DeletePictureAsync(pictureId);
        }
    }
}
