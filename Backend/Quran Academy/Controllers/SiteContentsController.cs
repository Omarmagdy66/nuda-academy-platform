using Controllers;
using Dto;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers;

[Route("api/[controller]")]
[ApiController]
public class SiteContentsController : ApiBaseController
{
    public SiteContentsController(IUnitofwork unitofwork) : base(unitofwork)
    {
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
        return Ok("Created");
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
        return Ok("Updated");
    }
}