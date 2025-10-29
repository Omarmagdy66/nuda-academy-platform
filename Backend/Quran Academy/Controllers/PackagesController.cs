using Dto;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackagesController : ApiBaseController
    {
        public PackagesController(IUnitofwork unitofwork) : base(unitofwork)
        {
        }

        [HttpGet("GetAllPackages")]
        public async Task<IActionResult> GetAllPackages()
        {
            var packages = await _unitofwork.packages.GetAllAsync();
            return Ok(packages);
        }

        [HttpGet("GetPackageById")]
        public async Task<IActionResult> GetPackageById(int id)
        {
            var package = await _unitofwork.packages.GetByIdAsync(id);
            if (package == null)
            {
                return NotFound();
            }
            return Ok(package);
        }

        [HttpPost("CreatePackage")]
        public async Task<IActionResult> CreatePackage(PackageDto packagedto)
        {
            var package = new Package
            {
                Name = packagedto.Name,
                Price = packagedto.Price,
                Features = packagedto.Features,
                IsActive = packagedto.IsActive

            };
            await _unitofwork.packages.AddAsync(package);
            _unitofwork.Save();
            return Ok("Created");
        }

        [HttpPut("UpdatePackage")]
        public async Task<IActionResult> UpdatePackage(int id, PackageDto packagedto)
        {
            var package = await _unitofwork.packages.GetByIdAsync(id);
            if (package == null)
            {
                return NotFound();
            }
            package.Name = packagedto.Name;
            package.Price = packagedto.Price;
            package.Features = packagedto.Features;
            package.IsActive = packagedto.IsActive;
            _unitofwork.packages.Update(package);
            _unitofwork.Save();
            return Ok("Updated");
        }

        [HttpDelete("DeletePackage")]
        public async Task<IActionResult> DeletePackage(int id)
        {
            var package = await _unitofwork.packages.GetByIdAsync(id);
            if (package == null)
            {
                return NotFound();
            }
            _unitofwork.packages.Delete(package);
            _unitofwork.Save();
            return Ok("Deleted");
        }
    }
}
