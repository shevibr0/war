 using AutoMapper;
using DL;
using DL.Models;
using Entities.DTO;

namespace BL
{
    public class UserBL : IUserBL
    {
        private IUserDL _userDL;
        private IMapper _mapper;

        public UserBL(IUserDL userDL, IMapper mapper)
        {
            _mapper = mapper;
            _userDL = userDL;
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var users = await _userDL.GetAllUsersAsync();
            return _mapper.Map<IEnumerable<UserDTO>>(users);
        }
        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await _userDL.GetUserByIdAsync(id);
            return _mapper.Map<UserDTO>(user);
        }
        public async Task<UserDTO> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            var user = await _userDL.GetUserByEmailAndPasswordAsync(email, password);
            return _mapper.Map<UserDTO>(user);
        }
        public async Task AddUserAsync(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            await _userDL.AddUserAsync(user);
        }
        public async Task UpdateUserAsync(int userId, UserDTO updatedUserDTO)
        {
            var updatedUser = _mapper.Map<User>(updatedUserDTO);
            await _userDL.UpdateUserAsync(userId, updatedUser);
        }
        public async Task DeleteUserAsync(int userId)
        {
            await _userDL.DeleteUserAsync(userId);
        }

    }
}