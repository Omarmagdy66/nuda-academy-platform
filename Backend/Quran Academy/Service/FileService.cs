using Services;

namespace Service;


public class FileService : IFileService
{
    // نحتاج IWebHostEnvironment هنا أيضاً
    private readonly IWebHostEnvironment _env;

    public FileService(IWebHostEnvironment env)
    {
        _env = env;
    }

    public async Task<string> UploadFileAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            // من الأفضل رمي استثناء هنا ليتم معالجته في الكنترولر
            throw new ArgumentException("No file uploaded.");
        }

        // 1. تحديد مسار المجلد (مثل: wwwroot/images)
        var uploadsFolder = Path.Combine(_env.WebRootPath, "Image");

        // 2. التأكد من وجود المجلد
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        // 3. إنشاء اسم فريد للملف
        var uniqueFileName = $"{Guid.NewGuid().ToString()}_{file.FileName}";
        var filePath = Path.Combine(uploadsFolder, file.FileName);

        // 4. حفظ الملف
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // 5. إرجاع الرابط العام
        var publicUrl = $"/Image/{uniqueFileName}";
        return publicUrl;
    }
}


