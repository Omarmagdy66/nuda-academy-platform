using Dto;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using Service;
using Services;


namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class testimonialsController : ApiBaseController
    {
        private readonly IFileService _fileService; 

        public testimonialsController(IUnitofwork unitofwork, IFileService fileService): base(unitofwork)
        {
            _unitofwork = unitofwork;
            _fileService = fileService;
        }

        [HttpGet("GetAllTestimonials")]
        public async Task<IActionResult> GetAllTestimonials()
        {
            var testimonials = await _unitofwork.testimonials.GetAllAsync();
            return Ok(testimonials);
        }
        [HttpGet("GetTestimonialById")]
        public async Task<IActionResult> GetTestimonialById(int id)
        {
            var testimonial = await _unitofwork.testimonials.GetByIdAsync(id);
            if (testimonial == null)
            {
                return NotFound();
            }
            return Ok(testimonial);
        }

        [HttpPost("AddTestimonial")]
        public async Task<IActionResult> AddTestimonial(TestimonialDto testimonialdto)
        {
            var imageurl = await _fileService.UploadFileAsync(testimonialdto.ImageUrl);

            var testimonial = new Testimonial
            {
                StudentName = testimonialdto.StudentName,
                TestimonialText = testimonialdto.TestimonialText,
                ImageUrl = imageurl.ToString(),
                Country = testimonialdto.Country,
                Order = testimonialdto.Order,
                IsActive = testimonialdto.IsActive
            };
            await _unitofwork.testimonials.AddAsync(testimonial);
            _unitofwork.Save();
            return Ok("Created");
        }

        [HttpPut("UpdateTestimonial")]
        public async Task<IActionResult> UpdateTestimonial(int id ,TestimonialDto testimonialdto)
        {
            var imageurl = await _fileService.UploadFileAsync(testimonialdto.ImageUrl);
            var testimonial = await _unitofwork.testimonials.GetByIdAsync(id);
            if (testimonial == null)
            {
                return NotFound();
            }
            testimonial.StudentName = testimonialdto.StudentName;
            testimonial.TestimonialText = testimonialdto.TestimonialText;
            testimonial.ImageUrl = imageurl.ToString();
            testimonial.Country = testimonialdto.Country;
            testimonial.Order = testimonialdto.Order;
            testimonial.IsActive = testimonialdto.IsActive;
            _unitofwork.testimonials.Update(testimonial);
            _unitofwork.Save();
            return Ok("Updated");
        }

        [HttpDelete("DeleteTestimonial")]
        public async Task<IActionResult> DeleteTestimonial(int id)
        {
            var testimonial = await _unitofwork.testimonials.GetByIdAsync(id);
            if (testimonial == null)
            {
                return NotFound();
            }
            _unitofwork.testimonials.Delete(testimonial);
            _unitofwork.Save();
            return Ok("Deleted");
        }
    }
}
