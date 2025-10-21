
// Backend/Controllers/PackagesController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoorAlhuda.Data;
using NoorAlhuda.Models;

namespace NoorAlhuda.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PackagesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PackagesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/packages
    [HttpGet]
    [AllowAnonymous] // Public endpoint to get all active packages
    public async Task<IActionResult> GetPackages()
    {
        var packages = await _context.Packages.Where(p => p.IsActive).ToListAsync();
        return Ok(packages);
    }

    // GET: api/packages/all
    [HttpGet("all")]
    [Authorize(Roles = "Admin")] // Admin endpoint to get all packages (active and inactive)
    public async Task<IActionResult> GetAllPackages()
    {
        var packages = await _context.Packages.ToListAsync();
        return Ok(packages);
    }
    
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetPackageById(int id)
    {
        var package = await _context.Packages.FindAsync(id);
        if (package == null) return NotFound();
        return Ok(package);
    }

    // POST: api/packages
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreatePackage([FromBody] Package package)
    {
        await _context.Packages.AddAsync(package);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPackageById), new { id = package.Id }, package);
    }

    // PUT: api/packages/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdatePackage(int id, [FromBody] Package updatedPackage)
    {
        if (id != updatedPackage.Id) return BadRequest();

        var package = await _context.Packages.FindAsync(id);
        if (package == null) return NotFound();

        package.Name = updatedPackage.Name;
        package.Price = updatedPackage.Price;
        package.Features = updatedPackage.Features;
        package.IsActive = updatedPackage.IsActive;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/packages/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeletePackage(int id)
    {
        var package = await _context.Packages.FindAsync(id);
        if (package == null) return NotFound();

        _context.Packages.Remove(package);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
