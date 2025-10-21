
// Backend/Models/FAQ.cs
using System.ComponentModel.DataAnnotations;

namespace NoorAlhuda.Models;

public class FAQ
{
    public int Id { get; set; }

    [Required]
    public string Question { get; set; } = string.Empty;

    [Required]
    public string Answer { get; set; } = string.Empty;

    // To control the display order
    public int DisplayOrder { get; set; }
}
