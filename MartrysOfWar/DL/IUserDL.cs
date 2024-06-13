using DL.Models;

namespace DL
{
    public interface IUserDL
    {
        Task AddUserAsync(User user);
        Task DeleteUserAsync(int userId);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByEmailAndPasswordAsync(string email, string password);
        Task UpdateUserAsync(int userId, User updatedUser);
    }
}