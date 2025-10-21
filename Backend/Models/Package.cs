
// Backend/Models/Package.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoorAlhuda.Models;

public class Package
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "decimal(10, 2)")]
    public decimal Price { get; set; }

    // Storing features as a JSON string for simplicity, e.g., "["Feature 1", "Feature 2"]"
    public string Features { get; set; } = "[]";

    public bool IsActive { get; set; } = true;
}

