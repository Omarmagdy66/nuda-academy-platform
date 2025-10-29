

namespace Dto;

public class TeacherDto
{
    public string Name { get; set; }
    public string Title { get; set; }
    public string Gender { get; set; }
    public string? Bio { get; set; }

    public IFormFile? ImageUrl { get; set; }
    public int Order { get; set; } 
    public bool IsActive { get; set; }
}
