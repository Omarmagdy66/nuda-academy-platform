
using Microsoft.EntityFrameworkCore;
using Models;

namespace Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Application> Applications { get; set; }
    public DbSet<Package> Packages { get; set; }
    public DbSet<SiteContent> SiteContents { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Testimonial> Testimonials { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Add unique index for SiteContent Key to prevent duplicates
        modelBuilder.Entity<SiteContent>()
            .HasIndex(sc => sc.Email)
            .IsUnique();
    }
}

