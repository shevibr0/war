using Entities.DTO;

namespace BL
{
    public interface IUserBL
    {
        Task AddUserAsync(UserDTO userDTO);
        Task DeleteUserAsync(int userId);
        Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        Task<UserDTO> GetUserByIdAsync(int id);
        Task<UserDTO> GetUserByEmailAndPasswordAsync(string email, string password);
        Task UpdateUserAsync(int userId, UserDTO updatedUserDTO);
    }
}