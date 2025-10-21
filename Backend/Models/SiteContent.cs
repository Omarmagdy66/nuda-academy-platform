
// Backend/Models/SiteContent.cs
using System.ComponentModel.DataAnnotations;

namespace NoorAlhuda.Models;

public class SiteContent
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    // Unique key for the content, e.g., "contact_email", "about_vision_text"
    public string Key { get; set; } = string.Empty;

    [Required]
    public string Value { get; set; } = string.Empty;
}
