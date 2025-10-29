

using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Package
{
    public int Id { get; set; }

    public string Name { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Price { get; set; }

    public string[] Features { get; set; }

    public bool IsActive { get; set; }
}

