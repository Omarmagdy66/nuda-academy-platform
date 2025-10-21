
// Backend/DTOs/LoginRequestDto.cs
using System.ComponentModel.DataAnnotations;

namespace NoorAlhuda.DTOs;

public class LoginRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

// Backend/DTOs/AuthResponseDto.cs
namespace NoorAlhuda.DTOs;

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public UserDto User { get; set; } = null!;
}

// Backend/DTOs/UserDto.cs
namespace NoorAlhuda.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
