using DL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class UserDL : IUserDL
    {
        private MartyrsofwarContext _martyrsofwarContext = new MartyrsofwarContext();

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            try
            {
                return await _martyrsofwarContext.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<User> GetUserByIdAsync(int id)
        {
            try
            {
                return await _martyrsofwarContext.Users.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<User> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            try
            {
                // Assuming that 'Users' is the DbSet in your DbContext
                var user = await _martyrsofwarContext.Users
                    .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
                    

                if (user == null)
                {
                    // Handle the case when the user is not found, for example, return null or throw an exception.
                    // Here, we return null, but you might want to customize this based on your requirements.
                    return null;
                }
                return user;
            }
            catch (Exception ex)
            {
                // Handle the exception appropriately, for example, log the error.
                throw new Exception("Error retrieving user details.", ex);
            }
        }

        public async Task AddUserAsync(User user)
        {
            try
            {
                _martyrsofwarContext.Users.Add(user);
                await _martyrsofwarContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task UpdateUserAsync(int userId, User updatedUser)
        {
            try
            {
                var existingUser = await _martyrsofwarContext.Users.FindAsync(userId);

                if (existingUser != null)
                {
                    _martyrsofwarContext.Entry(existingUser).CurrentValues.SetValues(updatedUser);
                    await _martyrsofwarContext.SaveChangesAsync();
                }
                // Handle case where user with the specified ID is not found
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task DeleteUserAsync(int userId)
        {
            try
            {
                var userToDelete = await _martyrsofwarContext.Users.FindAsync(userId);

                if (userToDelete != null)
                {
                    _martyrsofwarContext.Users.Remove(userToDelete);
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
