
// Backend/Controllers/ApplicationsController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoorAlhuda.Data;
using NoorAlhuda.Models;
using NoorAlhuda.DTOs;

namespace NoorAlhuda.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApplicationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ApplicationsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST: api/applications
    [HttpPost]
    [AllowAnonymous] // Anyone can submit an application
    public async Task<IActionResult> SubmitApplication([FromBody] CreateApplicationDto dto)
    {
        var application = new Application
        {
            Name = dto.Name,
            Age = dto.Age,
            Phone = dto.Phone,
            PackageName = dto.PackageName,
            Notes = dto.Notes,
            Status = "PENDING",
            CreatedAt = DateTime.UtcNow
        };

        await _context.Applications.AddAsync(application);
        await _context.SaveChangesAsync();

        // Returns the created object
        return CreatedAtAction(nameof(GetApplicationById), new { id = application.Id }, application);
    }

    // GET: api/applications
    [HttpGet]
    [Authorize(Roles = "Admin")] // Only Admins can view applications
    public async Task<IActionResult> GetApplications()
    {        
        var applications = await _context.Applications.OrderByDescending(a => a.CreatedAt).ToListAsync();
        return Ok(applications);
    }

    // GET: api/applications/5
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetApplicationById(int id)
    {
        var application = await _context.Applications.FindAsync(id);
        if (application == null)
        {
            return NotFound();
        }
        return Ok(application);
    }

    // PUT: api/applications/5/status
    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateApplicationStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        var application = await _context.Applications.FindAsync(id);
        if (application == null)
        {
            return NotFound();
        }

        application.Status = dto.Status;
        await _context.SaveChangesAsync();

        return Ok(application);
    }
}

public class UpdateStatusDto
{
    [Required] public string Status { get; set; } = string.Empty;
}

