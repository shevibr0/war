using DL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class VolunteeringOptionDL : IVolunteeringOptionDL
    {
        private MartyrsofwarContext _martyrsofwarContext = new MartyrsofwarContext();
        public async Task<IEnumerable<VolunteeringOption>> GetAllVolunteeringOptionsAsync()
        {
            try
            {
                return await _martyrsofwarContext.VolunteeringOptions.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IEnumerable<VolunteeringOption>> GetVolunteeringOptionByIdAsync(int id)
        {
            try
            {
                var options = await _martyrsofwarContext.VolunteeringOptions
                   .Where(r => r.IdSoldier == id)
                    .Include(r => r.IdUserNavigation)
                   .ToListAsync();

                return options;
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<VolunteeringOption>> GetVolunteeringOptionByIdAsyncOptionId(int id,int optionId)
        {
            try
            {
                var options = await _martyrsofwarContext.VolunteeringOptions
                   .Where(r => r.IdSoldier == id)
                    .Where(r => r.Id == optionId)
                    .Include(r => r.IdUserNavigation)
                   .ToListAsync();

                return options;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddVolunteeringOptionAsync(VolunteeringOption VolunteeringOption)
        {
            try
            {
                _martyrsofwarContext.VolunteeringOptions.Add(VolunteeringOption);
                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task UpdateVolunteeringOptionAsync(int volunteeringOptionId, VolunteeringOption updatedVolunteeringOption)
        {
            try
            {
                var existingVolunteeringOption = await _martyrsofwarContext.VolunteeringOptions.FindAsync(volunteeringOptionId);

                if (existingVolunteeringOption != null)
                {
                    _martyrsofwarContext.Entry(existingVolunteeringOption).CurrentValues.SetValues(updatedVolunteeringOption);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
                // Handle case where user with the specified ID is not found
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task DeleteVolunteeringOptionAsync(int volunteeringOptionId)
        {
            try
            {
                var volunteeringOptionToDelete = await _martyrsofwarContext.VolunteeringOptions.FindAsync(volunteeringOptionId);

                if (volunteeringOptionToDelete != null)
                {
                    _martyrsofwarContext.VolunteeringOptions.Remove(volunteeringOptionToDelete);
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
