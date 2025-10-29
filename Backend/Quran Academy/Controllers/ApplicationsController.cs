using Dto;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ApiBaseController
    {
        public ApplicationsController(IUnitofwork unitofwork) : base(unitofwork)
        {
        }

        [HttpGet("GetApplications")]
        public async Task<IActionResult> GetApplications()
        {
            var appStatus = await _unitofwork.applications.GetAllAsync();
            return Ok(appStatus);
        }

        [HttpPost("CreateApplication")]
        public async Task<IActionResult> CreateApplication(ApplicationDto applicationdto)
        {
            var isExistingPackage = await _unitofwork.packages.GetByIdAsync(applicationdto.PackageId);
            if (isExistingPackage == null)
            {
                return BadRequest("Invalid PackageId");
            }
            var application = new Application
            {
                Name = applicationdto.Name,
                Age = applicationdto.Age,
                Phone = applicationdto.Phone,
                Notes = applicationdto.Notes,
                Status = "PENDING",
                CreatedAt = DateTime.UtcNow,
                PackageId = applicationdto.PackageId
            };
             await _unitofwork.applications.AddAsync(application);
            _unitofwork.Save();
            return Ok("Created");
        }

        [HttpPut("UpdateApplicationStatus")]
        public async Task<IActionResult> UpdateApplicationStatus(int id)
        {
            var application = await _unitofwork.applications.GetByIdAsync(id);
            if (application == null)
            {
                return NotFound();
            }
            application.Status = "CONTACTED";
            _unitofwork.applications.Update(application);
            _unitofwork.Save();
            return Ok("Updated");
        }

        [HttpDelete("DeleteApplication")]
        public async Task<IActionResult> DeleteApplication(int id)
        {
            var application = await _unitofwork.applications.GetByIdAsync(id);
            if (application == null)
            {
                return NotFound();
            }
            _unitofwork.applications.Delete(application);
            _unitofwork.Save();
            return Ok("Deleted");
        }

    }
}
