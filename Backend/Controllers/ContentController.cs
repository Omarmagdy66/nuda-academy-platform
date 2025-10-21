
// Backend/Controllers/ContentController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoorAlhuda.Data;
using NoorAlhuda.Models;

namespace NoorAlhuda.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ContentController(ApplicationDbContext context)
    {
        _context = context;
    }

    // --- Site Content --- //

    // GET: api/content/site-settings
    [HttpGet("site-settings")]
    [AllowAnonymous]
    public async Task<IActionResult> GetSiteSettings()
    {
        var settings = await _context.SiteContents.ToListAsync();
        // Convert list to a dictionary for easier use in the frontend
        var settingsMap = settings.ToDictionary(s => s.Key, s => s.Value);
        return Ok(settingsMap);
    }

    // PUT: api/content/site-settings
    [HttpPut("site-settings")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateSiteSettings([FromBody] Dictionary<string, string> newSettings)
    {
        foreach (var setting in newSettings)
        {
            var dbSetting = await _context.SiteContents.FirstOrDefaultAsync(s => s.Key == setting.Key);
            if (dbSetting != null)
            {                
                dbSetting.Value = setting.Value;
            }
            else
            {
                // If the key doesn't exist, create it.
                _context.SiteContents.Add(new SiteContent { Key = setting.Key, Value = setting.Value });
            }
        }
        await _context.SaveChangesAsync();
        return Ok("Settings updated successfully");
    }

    // --- FAQs --- //

    // GET: api/content/faqs
    [HttpGet("faqs")]
    [AllowAnonymous]
    public async Task<IActionResult> GetFaqs()
    {
        var faqs = await _context.FAQs.OrderBy(f => f.DisplayOrder).ToListAsync();
        return Ok(faqs);
    }

    // POST: api/content/faqs
    [HttpPost("faqs")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateFaq([FromBody] FAQ faq)
    {
        await _context.FAQs.AddAsync(faq);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetFaqById), new { id = faq.Id }, faq);
    }

    [HttpGet("faqs/{id}")]
    [Authorize(Roles="Admin")]
    public async Task<IActionResult> GetFaqById(int id)
    {
      var faq = await _context.FAQs.FindAsync(id);
      if(faq == null) return NotFound();
      return Ok(faq);
    }

    // PUT: api/content/faqs/5
    [HttpPut("faqs/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateFaq(int id, [FromBody] FAQ updatedFaq)
    {
        if (id != updatedFaq.Id) return BadRequest();
        
        var faq = await _context.FAQs.FindAsync(id);
        if (faq == null) return NotFound();

        faq.Question = updatedFaq.Question;
        faq.Answer = updatedFaq.Answer;
        faq.DisplayOrder = updatedFaq.DisplayOrder;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/content/faqs/5
    [HttpDelete("faqs/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteFaq(int id)
    {
        var faq = await _context.FAQs.FindAsync(id);
        if (faq == null) return NotFound();

        _context.FAQs.Remove(faq);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
