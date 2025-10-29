
namespace Dto;

public class TestimonialDto
{

    public string StudentName { get; set; }

    public string? Country { get; set; }

    public string? TestimonialText { get; set; }

    public IFormFile? ImageUrl { get; set; }

    public int Order { get; set; } 
    public bool IsActive { get; set; }
}
