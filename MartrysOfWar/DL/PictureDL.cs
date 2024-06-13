using DL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class PictureDL : IPictureDL
    {
        private MartyrsofwarContext _martyrsofwarContext = new MartyrsofwarContext();
        public async Task<IEnumerable<Picture>> GetAllPicturesAsync()
        {
            try
            {
                return await _martyrsofwarContext.Pictures.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Picture>> GetPictureByIdAsync(int id)
        {
            try
            {
                var pictures = await _martyrsofwarContext.Pictures
                   .Where(m => m.IdSoldier == id)
                   .ToListAsync();

                return pictures;
               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task AddPictureAsync(Picture picture)
        {
            try
            {
                _martyrsofwarContext.Pictures.Add(picture);
                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task UpdatePictureAsync(int pictureId, Picture updatedPicture)
        {
            try
            {
                var existingPicture = await _martyrsofwarContext.Pictures.FindAsync(pictureId);

                if (existingPicture != null)
                {
                    _martyrsofwarContext.Entry(existingPicture).CurrentValues.SetValues(updatedPicture);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
                // Handle case where user with the specified ID is not found
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task DeletePictureAsync(int pictureId)
        {
            try
            {
                var pictureToDelete = await _martyrsofwarContext.Pictures.FindAsync(pictureId);

                if (pictureToDelete != null)
                {
                    _martyrsofwarContext.Pictures.Remove(pictureToDelete);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
                // Handle case where user with the specified ID is not found
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
