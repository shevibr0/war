using DL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class VolunteeringDL : IVolunteeringDL
    {
        private MartyrsofwarContext _martyrsofwarContext = new MartyrsofwarContext();
        public async Task<IEnumerable<Volunteering>> GetAllVolunteeringsAsync()
        {
            try
            {
                return await _martyrsofwarContext.Volunteerings.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Volunteering> GetVolunteeringByIdAsync(int id)
        {
            try
            {
                return await _martyrsofwarContext.Volunteerings.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task AddVolunteeringAsync(Volunteering volunteering)
        {
            try
            {
                _martyrsofwarContext.Volunteerings.Add(volunteering);
                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task UpdateVolunteeringAsync(int volunteeringId, Volunteering updatedVolunteering)
        {
            try
            {
                var existingVolunteering = await _martyrsofwarContext.Volunteerings.FindAsync(volunteeringId);

                if (existingVolunteering != null)
                {
                    _martyrsofwarContext.Entry(existingVolunteering).CurrentValues.SetValues(updatedVolunteering);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
                // Handle case where user with the specified ID is not found
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task DeleteVolunteeringAsync(int volunteeringId)
        {
            try
            {
                var volunteeringToDelete = await _martyrsofwarContext.Volunteerings.FindAsync(volunteeringId);

                if (volunteeringToDelete != null)
                {
                    _martyrsofwarContext.Volunteerings.Remove(volunteeringToDelete);
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
