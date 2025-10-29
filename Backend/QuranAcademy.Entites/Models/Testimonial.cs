
namespace Models;

public class Testimonial
{
    public int Id { get; set; }

    public string StudentName { get; set; }

    public string? Country { get; set; }

    public string? TestimonialText { get; set; }

    // سنخزن رابط الصورة فقط
    public string? ImageUrl { get; set; }

    public int Order { get; set; } 
    public bool IsActive { get; set; }
}
