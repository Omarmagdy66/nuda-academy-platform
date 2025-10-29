namespace Models;

public class Application
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int Age { get; set; }

    public string Phone { get; set; } 


    public string? Notes { get; set; }

    public string Status { get; set; } // "PENDING", "CONTACTED", "REJECTED"

    public DateTime CreatedAt { get; set; }
    public int PackageId { get; set; }
    public Package? Package { get; set; }

    }
