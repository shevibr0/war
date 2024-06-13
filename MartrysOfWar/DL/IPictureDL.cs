using DL.Models;

namespace DL
{
    public interface IPictureDL
    {
        Task AddPictureAsync(Picture picture);
        Task DeletePictureAsync(int pictureId);
        Task<IEnumerable<Picture>> GetAllPicturesAsync();
        Task<IEnumerable<Picture>> GetPictureByIdAsync(int id);
        Task UpdatePictureAsync(int pictureId, Picture updatedPicture);
    }
}