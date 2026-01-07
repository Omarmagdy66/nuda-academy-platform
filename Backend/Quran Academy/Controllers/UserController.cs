using Models;
using Dto;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require authorization for all actions in this controller
    public class UserController : ApiBaseController
    {
        public UserController(IUnitofwork unitofwork) : base(unitofwork)
        {
        }

        [HttpGet("GetMyProfile")]
        public async Task<IActionResult> GetMyProfile()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return BadRequest("Invalid User ID in token.");
            }

            var user = await _unitofwork.users.GetByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            // Return camelCase for frontend consistency
            return Ok(new { name = user.Name, email = user.Email });
        }

        [HttpGet("GetAllUsers")]
        [Authorize(Roles = "Admin")] // Example of role-based authorization
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _unitofwork.users.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("GetUserById/{id}")]
        [Authorize(Roles = "Admin")]
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
        [AllowAnonymous] // Allow anonymous access for user creation (registration)
        public async Task<IActionResult> CreateUser([FromBody] UserDto userdto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userdto.PasswordHash);
            var user = new User()
            {
                Name = userdto.Name,
                Email = userdto.Email,
                PasswordHash = hashedPassword,
                Role = "Student", // Default role
                CreatedAt = DateTime.UtcNow
            };

            await _unitofwork.users.AddAsync(user);
            _unitofwork.Save();

            return Ok(new { message = "User created successfully" });
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserDto userdto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return BadRequest("Invalid User ID in token.");
            }

            var existingUser = await _unitofwork.users.GetByIdAsync(userId);
            if (existingUser == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrWhiteSpace(userdto.Name))
            {
                existingUser.Name = userdto.Name;
            }

            if (!string.IsNullOrWhiteSpace(userdto.Email))
            {
                existingUser.Email = userdto.Email;
            }

            if (!string.IsNullOrWhiteSpace(userdto.PasswordHash))
            {
                existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userdto.PasswordHash);
            }

            _unitofwork.users.Update(existingUser);
            _unitofwork.Save();

            // Return the updated user's name and email in camelCase
            return Ok(new { name = existingUser.Name, email = existingUser.Email });
        }

        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return BadRequest("Invalid User ID in token.");
            }

            var user = await _unitofwork.users.GetByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            _unitofwork.users.Remove(user);
            _unitofwork.Save();

            return Ok(new { message = "User deleted successfully" });
        }
    }
}
