
// Backend/DTOs/ApplicationDto.cs
using System.ComponentModel.DataAnnotations;

namespace NoorAlhuda.DTOs;

public class CreateApplicationDto
{
    [Required]
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    [Required]
    public string Phone { get; set; } = string.Empty;
    [Required]
    public string PackageName { get; set; } = string.Empty;
    public string? Notes { get; set; }
}
