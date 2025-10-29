using Models;
using Dto;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ApiBaseController
    {
        public UserController(IUnitofwork unitofwork) : base(unitofwork)
        {
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _unitofwork.users.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("GetUserById")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _unitofwork.users.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userdto)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userdto.PasswordHash);
            var User = new User()
            {
                Name = userdto.Name,
                Email = userdto.Email,
                PasswordHash = hashedPassword,
                Role = "Admin",
                CreatedAt = DateTime.UtcNow
            };
            await _unitofwork.users.AddAsync(User);
            _unitofwork.Save();
            return Ok("Created");
        }
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser( [FromBody] UserDto userdto)
        {
            var UserIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

            if (UserIdClaim == null)
            {
                return Unauthorized("Patient ID not found in token.");
            }

            // Parse the patient ID
            
            if (!int.TryParse(UserIdClaim, out int userId))
            {
                return BadRequest("Invalid Patient ID in token.");
            }
            var existingUser = await _unitofwork.users.GetByIdAsync(userId);
            if (existingUser == null)
            {
                return NotFound();
            }
            existingUser.Name = userdto.Name;
            existingUser.Email = userdto.Email;
            if (!string.IsNullOrEmpty(userdto.PasswordHash))
            {
                existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userdto.PasswordHash);
            }
            _unitofwork.users.Update(existingUser);
            _unitofwork.Save();
            return Ok("Updated");
        }
    }
}
