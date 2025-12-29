using Dto;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Service;
using System.Threading.Tasks;

namespace Controllers;

[Route("api/[controller]")]
[ApiController]
public class TeacherController : ApiBaseController
{
    private readonly IFileService _fileService;
    private readonly ILogger<TeacherController> _logger;

    public TeacherController(IUnitofwork unitofwork, IFileService fileService, ILogger<TeacherController> logger) : base(unitofwork)
    {
        _fileService = fileService;
        _logger = logger;
    }

    [HttpGet("GetAllTeacher")]
    public async Task<IActionResult> GetAllTeacher()
    {
        var teachers = await _unitofwork.teachers.GetAllAsync();
        return Ok(teachers.OrderBy(t => t.Order));
    }

    [HttpGet("GetActiveTeachers")]
    public async Task<IActionResult> GetActiveTeachers()
    {
        var teachers = await _unitofwork.teachers.FindAllAsync(t => t.IsActive);
        return Ok(teachers.OrderBy(t => t.Order));
    }

    [HttpPost("AddTeacher")]
    public async Task<IActionResult> AddTeacher([FromForm] TeacherDto teacherdto)
    {
        _logger.LogInformation("----- Starting AddTeacher Process -----");
        string imageUrl = null;

        if (teacherdto.ImageUrl != null)
        {
            _logger.LogInformation("Image file detected: {FileName}, Size: {Length} bytes.", teacherdto.ImageUrl.FileName, teacherdto.ImageUrl.Length);
            imageUrl = await _fileService.SaveFileAsync(teacherdto.ImageUrl, "Teachers");
            _logger.LogInformation("Image saved. Path: {Path}", imageUrl);
        }
        else
        {
            _logger.LogWarning("No image file provided. Applying default image.");
            if (teacherdto.Gender?.ToLower() == "male" || teacherdto.Gender == "ذكر")
                imageUrl = "/images/defaults/male-teacher.png";
            else if (teacherdto.Gender?.ToLower() == "female" || teacherdto.Gender == "انثي")
                imageUrl = "/images/defaults/female-teacher.png";
             _logger.LogInformation("Default image path: {Path}", imageUrl);
        }

        var teacher = new Teacher
        {
            Name = teacherdto.Name,
            Bio = teacherdto.Bio,
            Title = teacherdto.Title,
            Gender = teacherdto.Gender,
            IsActive = teacherdto.IsActive,
            Order = teacherdto.Order,
            ImageUrl = imageUrl
        };

        await _unitofwork.teachers.AddAsync(teacher);
        await _unitofwork.SaveAsync();
        _logger.LogInformation("Teacher '{Name}' created successfully in database.", teacher.Name);
        _logger.LogInformation("----- Finished AddTeacher Process -----");
        return Ok("Created Successfully");
    }

    [HttpPut("UpdateTeacher")]
    public async Task<IActionResult> UpdateTeacher(int id, [FromForm] TeacherDto teacherdto)
    {
        _logger.LogInformation("----- Starting UpdateTeacher Process for ID: {Id} -----", id);
        var teacher = await _unitofwork.teachers.GetByIdAsync(id);
        if (teacher == null)
        {
            _logger.LogError("Update failed: Teacher with ID {Id} not found.", id);
            return NotFound("Teacher not found.");
        }

        _logger.LogInformation("Found teacher: {Name}. Current image path is: '{ImagePath}'", teacher.Name, teacher.ImageUrl);

        if (teacherdto.ImageUrl != null)
        {
            _logger.LogInformation("New image file detected: {FileName}, Size: {Length} bytes.", teacherdto.ImageUrl.FileName, teacherdto.ImageUrl.Length);
            
            if (!string.IsNullOrEmpty(teacher.ImageUrl) && !teacher.ImageUrl.Contains("/images/defaults/"))
            {
                _logger.LogInformation("Deleting old image: {ImagePath}", teacher.ImageUrl);
                _fileService.DeleteFile(teacher.ImageUrl);
            }

            var newImagePath = await _fileService.SaveFileAsync(teacherdto.ImageUrl, "Teachers");
            teacher.ImageUrl = newImagePath;
            _logger.LogInformation("New image saved. Path assigned to teacher: {Path}", newImagePath);
        }
        else
        {
            _logger.LogWarning("No new image file provided. Image will not be changed.");
        }

        teacher.Name = teacherdto.Name;
        teacher.Bio = teacherdto.Bio;
        teacher.Title = teacherdto.Title;
        teacher.IsActive = teacherdto.IsActive;
        teacher.Order = teacherdto.Order;
        teacher.Gender = teacherdto.Gender;

        _unitofwork.teachers.Update(teacher);
        await _unitofwork.SaveAsync();

        _logger.LogInformation("Teacher '{Name}' (ID: {Id}) updated successfully in database.", teacher.Name, id);
        _logger.LogInformation("----- Finished UpdateTeacher Process -----");

        return Ok("Updated Successfully");
    }

    [HttpDelete("DeleteTeacher")]
    public async Task<IActionResult> DeleteTeacher(int id)
    {
        _logger.LogInformation("----- Starting DeleteTeacher Process for ID: {Id} -----", id);
        var teacher = await _unitofwork.teachers.GetByIdAsync(id);
        if (teacher == null)
        {
            _logger.LogError("Delete failed: Teacher with ID {Id} not found.", id);
            return NotFound();
        }

        if (!string.IsNullOrEmpty(teacher.ImageUrl) && !teacher.ImageUrl.Contains("/images/defaults/"))
        {
            _logger.LogInformation("Deleting associated image: {ImagePath}", teacher.ImageUrl);
            _fileService.DeleteFile(teacher.ImageUrl);
        }

        _unitofwork.teachers.Delete(teacher);
        await _unitofwork.SaveAsync();
        _logger.LogInformation("Teacher '{Name}' (ID: {Id}) and associated image deleted successfully.", teacher.Name, id);
        _logger.LogInformation("----- Finished DeleteTeacher Process -----");
        return Ok("Deleted Successfully");
    }
}
