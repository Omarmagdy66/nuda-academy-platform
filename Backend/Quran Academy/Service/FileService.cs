using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Service;

public class FileService : IFileService
{
    private readonly IWebHostEnvironment _env;

    public FileService(IWebHostEnvironment env)
    {
        _env = env;
    }

    public async Task<string> SaveFileAsync(IFormFile file, string subfolder)
    {
        if (file == null || file.Length == 0)
        {
            return null;
        }

        // Define the main directory where files will be stored (e.g., wwwroot/Image)
        var uploadsRootFolder = Path.Combine(_env.WebRootPath, "Image");
        var targetFolder = Path.Combine(uploadsRootFolder, subfolder);

        // Ensure the target subfolder exists
        if (!Directory.Exists(targetFolder))
        {
            Directory.CreateDirectory(targetFolder);
        }

        // Create a unique filename to prevent overwriting and conflicts
        var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
        var filePath = Path.Combine(targetFolder, uniqueFileName);

        // Save the file to the server
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Return the relative path to be stored in the database
        // e.g., /Image/Testimonials/uniquefile.jpg
        var relativePath = Path.Combine("/Image", subfolder, uniqueFileName).Replace('\\', '/');
        return relativePath;
    }

    public void DeleteFile(string relativePath)
    {
        if (string.IsNullOrEmpty(relativePath))
        {
            return;
        }

        // Convert the relative web path to a full physical path
        // e.g., /Image/Testimonials/file.jpg -> C:\project\wwwroot\Image\Testimonials\file.jpg
        var physicalPath = Path.Combine(_env.WebRootPath, relativePath.TrimStart('/').Replace('/', '\\'));

        // Check if the file exists and delete it
        if (File.Exists(physicalPath))
        {
            try
            {
                File.Delete(physicalPath);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                Console.WriteLine($"Error deleting file: {physicalPath}. Error: {ex.Message}");
            }
        }
    }
}
