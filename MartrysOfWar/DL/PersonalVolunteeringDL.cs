using DL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class PersonalVolunteeringDL : IPersonalVolunteeringDL
    {
        private MartyrsofwarContext _martyrsofwarContext = new MartyrsofwarContext();
        public async Task<IEnumerable<PersonalVolunteering>> GetAllPersonalVolunteeringsAsync()
        {
            try
            {
                return await _martyrsofwarContext.PersonalVolunteerings.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<PersonalVolunteering> GetPersonalVolunteeringByIdAsync(int id)
        {
            try
            {
                return await _martyrsofwarContext.PersonalVolunteerings.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task AddPersonalVolunteeringAsync(PersonalVolunteering personalVolunteering)
        {
            try
            {
                _martyrsofwarContext.PersonalVolunteerings.Add(personalVolunteering);
                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task UpdatePersonalVolunteeringAsync(int personalVolunteeringId, PersonalVolunteering updatedPersonalVolunteering)
        {
            try
            {
                var existingPersonalVolunteering = await _martyrsofwarContext.PersonalVolunteerings.FindAsync(personalVolunteeringId);

                if (existingPersonalVolunteering != null)
                {
                    _martyrsofwarContext.Entry(existingPersonalVolunteering).CurrentValues.SetValues(updatedPersonalVolunteering);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
                // Handle case where user with the specified ID is not found
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task DeletePersonalVolunteeringAsync(int personalVolunteeringId)
        {
            try
            {
                var personalVolunteeringToDelete = await _martyrsofwarContext.PersonalVolunteerings.FindAsync(personalVolunteeringId);

                if (personalVolunteeringToDelete != null)
                {
                    _martyrsofwarContext.PersonalVolunteerings.Remove(personalVolunteeringToDelete);
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
