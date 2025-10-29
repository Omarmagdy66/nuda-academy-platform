

namespace Models;

public class Teacher
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Title { get; set; }

    public string? Bio { get; set; }

    // سنخزن رابط الصورة فقط
    public string? ImageUrl { get; set; }

    public string Gender { get; set; }
    public int Order { get; set; } 
    public bool IsActive { get; set; }
}
