
// Backend/Models/Application.cs
using System.ComponentModel.DataAnnotations;

namespace NoorAlhuda.Models;

public class Application
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public int Age { get; set; }

    [Required]
    [MaxLength(50)]
    public string Phone { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string PackageName { get; set; } = string.Empty;

    public string? Notes { get; set; }

    [Required]
    public string Status { get; set; } = "PENDING"; // "PENDING", "CONTACTED", "REJECTED"

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
