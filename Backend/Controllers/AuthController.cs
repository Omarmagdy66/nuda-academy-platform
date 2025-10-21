
// Backend/Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using NoorAlhuda.Data;
using NoorAlhuda.Models;
using NoorAlhuda.DTOs;
using Microsoft.EntityFrameworkCore;

namespace NoorAlhuda.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // POST: api/auth/register (Endpoint to create the first admin user)
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        if (await _context.Users.AnyAsync(u => u.Email == model.Email))
        {
            return BadRequest("User with this email already exists.");
        }

        // In a real app, you'd want to control who can register.
        // For this case, we can assume only an admin can create other users, 
        // or this is a one-time setup endpoint.

        var user = new User
        {
            Name = model.Name,
            Email = model.Email,
            // IMPORTANT: Never store plain text passwords. Always hash them.
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
            Role = model.Role ?? "Student" // Default role
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return StatusCode(201, "User created successfully.");
    }


    // POST: api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid credentials." });
        }

        var token = GenerateJwtToken(user);

        var userDto = new UserDto { Id = user.Id, Name = user.Name, Email = user.Email, Role = user.Role };

        return Ok(new AuthResponseDto { Token = token, User = userDto });
    }

    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        
        // Make sure to set a strong, long, secret key in your appsettings.json
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? "DefaultSuperSecretKey12345");

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"]
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}

// DTO for the one-time registration
public class RegisterDto
{
    [Required] public string Name { get; set; } = string.Empty;
    [Required] [EmailAddress] public string Email { get; set; } = string.Empty;
    [Required] public string Password { get; set; } = string.Empty;
    public string? Role { get; set; }
}
