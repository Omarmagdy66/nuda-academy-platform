using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Service;

public interface IFileService
{
    Task<string> SaveFileAsync(IFormFile file, string subfolder);
    void DeleteFile(string relativePath);
}
