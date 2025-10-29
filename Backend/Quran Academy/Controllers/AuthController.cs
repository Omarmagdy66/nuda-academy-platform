using Dto;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using Services;
using System.Data;

namespace Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ApiBaseController
{
    private readonly IConfiguration configuration;

    private readonly JWTService jwt;

    public AuthController(IUnitofwork unitOfWork, IConfiguration configuration) : base(unitOfWork)
    {
        this.configuration = configuration;
        jwt = new JWTService(configuration);
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        User user = await _unitofwork.users.FindAsync(u => u.Email == loginDto.Email);
        if (user == null)
        {
            return BadRequest("Email or Password is incorrect");
        }


        // Verify password
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);
        if (!isPasswordValid) return BadRequest("Username or Password is incorrect");

        return Ok(new
        {
            token = jwt.GenerateJSONWebToken(user, "Admin"),
            expiration = DateTime.UtcNow.AddHours(1)
        });

    }
}
