using Entities.DTO;

namespace BL
{
    public interface IPictureBL
    {
        Task AddPictureAsync(PictureDTO pictureDTO);
        Task DeletePictureAsync(int pictureId);
        Task<IEnumerable<PictureDTO>> GetAllPicturesAsync();
        Task<IEnumerable<PictureDTO>> GetPictureByIdAsync(int id);
        Task UpdatePictureAsync(int pictureId, PictureDTO updatedPictureDTO);
    }
}