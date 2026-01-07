using Dto;
using Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using System.Linq;
using System.Threading.Tasks;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SiteContentsController : ApiBaseController
    {
        private readonly EncryptionService _encryptionService;

        public SiteContentsController(IUnitofwork unitofwork, EncryptionService encryptionService) : base(unitofwork)
        {
            _encryptionService = encryptionService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var siteContents = await _unitofwork.siteContents.GetAllAsync();
            return Ok(siteContents);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetSiteContentForAdmin")]
        public async Task<IActionResult> GetSiteContent()
        {
            var id = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

            if (id == null)
            {
                return Unauthorized("Admin ID not found in token.");
            }

            if (!int.TryParse(id, out int UserId))
            {
                return BadRequest("Invalid Admin ID in token.");
            }

            var siteContent = await _unitofwork.siteContents.FindAsync(s => s.UserId == UserId);

            if (siteContent == null)
            {
                return NotFound();
            }

            return Ok(siteContent);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("CreateSiteContent")]
        public async Task<IActionResult> CreateSiteContent(SiteContentDto dto)
        {
            var id = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

            if (id == null)
            {
                return Unauthorized("Admin ID not found in token.");
            }

            if (!int.TryParse(id, out int UserId))
            {
                return BadRequest("Invalid Admin ID in token.");
            }

            var siteContent = new SiteContent
            {
                Email = dto.Email,
                Phone = dto.Phone,
                Password = _encryptionService.Encrypt(dto.Password),
                UserId = UserId
            };
            await _unitofwork.siteContents.AddAsync(siteContent);
            _unitofwork.Save();

            return Ok(siteContent);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("UpdateSiteContent")]
        public async Task<IActionResult> UpdateSiteContent(int id, SiteContentDto dto)
        {
            var siteContent = await _unitofwork.siteContents.GetByIdAsync(id);
            if (siteContent == null)
            {
                return NotFound();
            }

            bool hasChanges = false;

            if (dto.Email != null && !string.Equals(siteContent.Email, dto.Email))
            {
                siteContent.Email = dto.Email;
                hasChanges = true;
            }

            if (dto.Phone != null && !string.Equals(siteContent.Phone, dto.Phone))
            {
                siteContent.Phone = dto.Phone;
                hasChanges = true;
            }

            if (!string.IsNullOrEmpty(dto.Password))
            {
                siteContent.Password = _encryptionService.Encrypt(dto.Password);
                hasChanges = true;
            }

            if (hasChanges)
            {
                _unitofwork.siteContents.Update(siteContent);
                _unitofwork.Save();
            }

            return Ok(siteContent);
        }
    }
}
