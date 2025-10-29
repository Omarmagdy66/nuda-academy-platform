using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[Route("api/[controller]")]
[ApiController]
public class ApiBaseController : ControllerBase
{
    protected IUnitofwork _unitofwork;
    public ApiBaseController(IUnitofwork unitofwork)
    {
        _unitofwork = unitofwork;
    }
}
