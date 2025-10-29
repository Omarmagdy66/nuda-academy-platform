

using System.ComponentModel.DataAnnotations.Schema;

namespace Dto;

public class PackageDto
{

    public string Name { get; set; }

    public decimal Price { get; set; }

    public string[] Features { get; set; }

    public bool IsActive { get; set; }
}

