
// Backend/Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using NoorAlhuda.Models;

namespace NoorAlhuda.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Application> Applications { get; set; }
    public DbSet<Package> Packages { get; set; }
    public DbSet<SiteContent> SiteContents { get; set; }
    public DbSet<FAQ> FAQs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Add unique index for SiteContent Key to prevent duplicates
        modelBuilder.Entity<SiteContent>()
            .HasIndex(sc => sc.Key)
            .IsUnique();

        // Seed initial data (optional but recommended)
        modelBuilder.Entity<SiteContent>().HasData(
            new SiteContent { Id = 1, Key = "contact_email", Value = "info@example.com" },
            new SiteContent { Id = 2, Key = "contact_whatsapp", Value = "+966501234567" },
            new SiteContent { Id = 3, Key = "about_us_text", Value = "هنا نص تعريفي عن الأكاديمية." },
            new SiteContent { Id = 4, Key = "our_vision_text", Value = "هنا نص الرؤية الخاص بالأكاديمية." }
        );
    }
}

