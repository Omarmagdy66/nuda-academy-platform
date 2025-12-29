using Dto;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;
using Service;

namespace Controllers;

[Route("api/[controller]")]
[ApiController]
public class testimonialsController : ApiBaseController
{
    private readonly IFileService _fileService;

    public testimonialsController(IUnitofwork unitofwork, IFileService fileService) : base(unitofwork)
    {
        _fileService = fileService;
    }

    [HttpGet("GetAllTestimonials")]
    public async Task<IActionResult> GetAllTestimonials()
    {
        // The underlying entity uses ImageUrl, so we don't need to change anything here.
        var testimonials = await _unitofwork.testimonials.GetAllAsync();
        return Ok(testimonials.OrderBy(t => t.Order));
    }

    [HttpGet("GetActiveTestimonials")]
    public async Task<IActionResult> GetActiveTestimonials()
    {
        var testimonials = await _unitofwork.testimonials.FindAllAsync(t => t.IsActive);
        return Ok(testimonials.OrderBy(t => t.Order));
    }

    [HttpPost("AddTestimonial")]
    public async Task<IActionResult> AddTestimonial([FromForm] TestimonialDto testimonialDto)
    {
        string newImageUrl = null;
        if (testimonialDto.ImageUrl != null)
        {
            newImageUrl = await _fileService.SaveFileAsync(testimonialDto.ImageUrl, "Testimonials");
        }

        var testimonial = new Testimonial
        {
            StudentName = testimonialDto.StudentName,
            TestimonialText = testimonialDto.TestimonialText,
            Country = testimonialDto.Country,
            Order = testimonialDto.Order,
            IsActive = testimonialDto.IsActive,
            ImageUrl = newImageUrl // Use ImageUrl to match the entity
        };

        await _unitofwork.testimonials.AddAsync(testimonial);
        await _unitofwork.SaveAsync();
        return Ok("Testimonial created successfully.");
    }

    [HttpPut("UpdateTestimonial")]
    public async Task<IActionResult> UpdateTestimonial(int id, [FromForm] TestimonialDto testimonialDto)
    {
        var testimonial = await _unitofwork.testimonials.GetByIdAsync(id);
        if (testimonial == null)
        {
            return NotFound("Testimonial not found.");
        }

        // The DTO contains the IFormFile, the entity contains the path string
        if (testimonialDto.ImageUrl != null)
        {
            // Delete the old image if it exists
            if (!string.IsNullOrEmpty(testimonial.ImageUrl))
            {
                _fileService.DeleteFile(testimonial.ImageUrl);
            }
            // Save the new image and update the path
            testimonial.ImageUrl = await _fileService.SaveFileAsync(testimonialDto.ImageUrl, "Testimonials");
        }

        // Update other properties
        testimonial.StudentName = testimonialDto.StudentName;
        testimonial.TestimonialText = testimonialDto.TestimonialText;
        testimonial.Country = testimonialDto.Country;
        testimonial.Order = testimonialDto.Order;
        testimonial.IsActive = testimonialDto.IsActive;

        _unitofwork.testimonials.Update(testimonial);
        await _unitofwork.SaveAsync();
        return Ok("Testimonial updated successfully.");
    }

    [HttpDelete("DeleteTestimonial")]
    public async Task<IActionResult> DeleteTestimonial(int id)
    {
        var testimonial = await _unitofwork.testimonials.GetByIdAsync(id);
        if (testimonial == null)
        { 
            return NotFound();
        }

        // Delete the associated image file before deleting the entity
        if (!string.IsNullOrEmpty(testimonial.ImageUrl))
        {
            _fileService.DeleteFile(testimonial.ImageUrl);
        }

        _unitofwork.testimonials.Delete(testimonial);
        await _unitofwork.SaveAsync();
        return Ok("Testimonial deleted successfully.");
    }
}
