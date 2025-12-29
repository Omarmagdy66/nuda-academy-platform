
using Controllers;
using Dto;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Linq;

namespace Controllers;

[Route("api/[controller]")]
[ApiController]
public class SiteContentsController : ApiBaseController
{
    public SiteContentsController(IUnitofwork unitofwork) : base(unitofwork)
    {
    }

    [HttpGet("GetSiteContent")]
    public async Task<IActionResult> GetSiteContent()
    {
        var siteContent = (await _unitofwork.siteContents.GetAllAsync())
                            .OrderByDescending(sc => sc.Id)
                            .FirstOrDefault();

        if (siteContent == null)
        {
            return NotFound("No site content has been configured yet.");
        }

        var dto = new SiteContentDto
        {
            Email = siteContent.Email,
            Phone = siteContent.Phone
        };

        return Ok(dto);
    }

    [HttpPost("CreateSiteContent")]
    public async Task<IActionResult> CreateSiteContent(SiteContentDto dto)
    {
        var siteContent = new SiteContent
        {
            Email = dto.Email,
            Phone = dto.Phone
        };
        await _unitofwork.siteContents.AddAsync(siteContent);
        _unitofwork.Save();
        return Ok(new { message = "Created" });
    }

    [HttpPut("UpdateSiteContent")]
    public async Task<IActionResult> UpdateSiteContent(int id, SiteContentDto dto)
    {
        var siteContent = await _unitofwork.siteContents.GetByIdAsync(id);
        if (siteContent == null)
        {
            return NotFound();
        }
        siteContent.Email = dto.Email;
        siteContent.Phone = dto.Phone;
        _unitofwork.siteContents.Update(siteContent);
        _unitofwork.Save();
        return Ok(new { message = "Updated" });
    }
}
