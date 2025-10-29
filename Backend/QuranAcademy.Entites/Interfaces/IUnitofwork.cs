using Models;

namespace Interfaces
{
    public interface IUnitofwork : IDisposable
    {
        public IRepository<Application> applications { get; }
        public IRepository<User> users { get; }
        public IRepository<Package> packages { get; }
        public IRepository<SiteContent> siteContents { get; }
        public IRepository<Teacher> teachers { get; }
        public IRepository<Testimonial> testimonials { get; }

        int Save();
        Task<int> SaveAsync();

    }
}
