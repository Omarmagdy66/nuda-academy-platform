using Interfaces;
using Models;
using Data;


namespace Repository;

public class Unitofwork : IUnitofwork
{
    protected ApplicationDbContext _context;
    public Unitofwork(ApplicationDbContext context) {
    
        _context = context;
        users = new Repository<User>(_context);
        applications = new Repository<Application>(_context);
        packages = new Repository<Package>(_context);
        siteContents = new Repository<SiteContent>(_context);
        teachers = new Repository<Teacher>(_context);
        testimonials = new Repository<Testimonial>(_context);



    }
    public IRepository<Application> applications { get; }
    public IRepository<User> users { get; }
    public IRepository<Package> packages { get; }
    public IRepository<SiteContent> siteContents { get; }
    public IRepository<Teacher> teachers { get; }
    public IRepository<Testimonial> testimonials { get; }

    public void Dispose()
    {
        _context.Dispose();
    }

    public int Save()
    {
        return _context.SaveChanges();
    }


    public async Task<int> SaveAsync()
    {
        return await _context.SaveChangesAsync();
    }
}


