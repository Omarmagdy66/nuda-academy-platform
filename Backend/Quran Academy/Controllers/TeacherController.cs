using Dto;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Service;
using Services;

namespace Controllers;

[Route("api/[controller]")]
[ApiController]
public class TeacherController : ApiBaseController
{
    private readonly IFileService _fileService;
    public TeacherController(IUnitofwork unitofwork , IFileService fileService) : base(unitofwork)
    {
        _fileService = fileService;
    }
    [HttpGet("GetAllTeacher")]
    public async Task<IActionResult> GetAllTeacher()
    {
        var teachers = await _unitofwork.teachers.GetAllAsync();
        return Ok(teachers);
    }

    [HttpGet("GetTeacherById")]
    public async Task<IActionResult> GetTeacherById(int id)
    {
        var teacher = await _unitofwork.teachers.FindAsync(t => t.Id == id);
        if (teacher == null)
        {
            return NotFound();
        }
        return Ok(teacher);
    }
    [HttpGet("GetActiveTeachers")]
    public async Task<IActionResult> GetActiveTeacher(int id)
    {
        var teacher = await _unitofwork.teachers.FindAllAsync(t => t.IsActive == true);
        if (teacher == null)
        {
            return NotFound();
        }
        return Ok(teacher);
    }



    [HttpPost("AddTeacher")]
    public async Task<IActionResult> AddTeacher(TeacherDto teacherdto)
    {
        var imageurl = string.Empty;
        if (teacherdto.Gender.ToLower() == "male" || teacherdto.Gender == "ذكر")
            imageurl = "\\Image\\Male.png";
        else if (teacherdto.Gender.ToLower() == "female" || teacherdto.Gender == "انثي")
            imageurl = "\\Image\\Female.png";
        else
            imageurl = null;

            var teacher = new Teacher
            {
                Name = teacherdto.Name,
                Bio = teacherdto.Bio,
                ImageUrl = imageurl,
                IsActive = teacherdto.IsActive,
                Title = teacherdto.Title,
                Gender = teacherdto.Gender,
                Order = teacherdto.Order
            };
        await _unitofwork.teachers.AddAsync(teacher);
        await _unitofwork.SaveAsync();
        return Ok("Created");
    }
    [HttpPut("UpdateTeacher")]
    public async Task<IActionResult> UpdateTeacher(int id , TeacherDto teacherdto)
    {
        var imageurl = string.Empty;
        if (teacherdto.Gender.ToLower() == "male" || teacherdto.Gender == "ذكر")
            imageurl = "\\Image\\Male.png";
        else if (teacherdto.Gender.ToLower() == "female" || teacherdto.Gender == "انثي")
            imageurl = "\\Image\\Female.png";
        else
            imageurl = null;

        var teacher = await _unitofwork.teachers.FindAsync(t => t.Id == id);
        if (teacher == null)
        {
            return NotFound();
        }
        teacher.Name = teacherdto.Name;
        teacher.Bio = teacherdto.Bio;
        teacher.ImageUrl = imageurl;
        teacher.IsActive = teacherdto.IsActive;
        teacher.Title = teacherdto.Title;
        teacher.Order = teacherdto.Order;
        teacher.Gender = teacherdto.Gender;
        _unitofwork.teachers.Update(teacher);
        _unitofwork.Save();
        return Ok("Updated");
    }

    [HttpDelete("DeleteTeacher")]
    public async Task<IActionResult> DeleteTeacher(int id)
    {
        var teacher = await _unitofwork.teachers.FindAsync(t => t.Id == id);
        if (teacher == null)
        {
            return NotFound();
        }
        _unitofwork.teachers.Delete(teacher);
        _unitofwork.Save();
        return Ok("Deleted");
    }

}
