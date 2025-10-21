
// Backend/Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace NoorAlhuda.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    public string Role { get; set; } = string.Empty; // "Admin", "Teacher", "Student"
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
