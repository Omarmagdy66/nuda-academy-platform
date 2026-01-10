
import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import WhatsAppFloat from './WhatsAppFloat';
import ScrollToTopButton from './ScrollToTopButton'; // Import the new component
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { User, Home, UserPlus, Menu, X, Info, Package, Mail, Phone, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// --- Data Fetching ---
interface SiteContentDto {
  email: string;
  phone: string;
}

const fetchSiteContent = async (): Promise<SiteContentDto> => {
  const response = await fetch('https://tibyanacademy.runasp.net/api/SiteContents/GetAll');
  if (!response.ok) {
    console.error('Failed to fetch site content, using fallback values.');
    return { email: 'info@nooralhudaacademy.com', phone: '+966501234567' };
  }
  const data = await response.json();
  if (Array.isArray(data) && data.length > 0) {
    return { email: data[0].email, phone: data[0].phone };
  }
  console.warn('Site content is empty, using fallback values.');
  return { email: 'info@nooralhudaacademy.com', phone: '+966501234567' };
};


const Layout = () => {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: siteContent, isLoading } = useQuery<SiteContentDto>({
    queryKey: ['siteContentLayout'], 
    queryFn: fetchSiteContent,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const isAdminPage = location.pathname.includes('/admin');

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'الباقات', path: '/packages', icon: Package },
    { name: 'من نحن', path: '/about', icon: Info },
    { name: 'تسجيل الدخول', path: '/login', icon: User },
    { name: 'التسجيل', path: '/register', icon: UserPlus },
  ];

  const publicNavItems = navItems.filter(item => item.path !== '/login');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-28 items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <img src="/images/logo.png" alt="أكاديمية عاكفين" className="h-24" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            {publicNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 space-x-reverse text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse">
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex">
              <Link to="/register">ابدأ الآن</Link>
            </Button>
            
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[340px]">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <h3 className="font-semibold text-lg">القائمة</h3>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                           <X className="h-5 w-5" />
                        </Button>
                      </SheetClose>
                    </div>
                    
                    <nav className="flex flex-col space-y-4 mt-6">
                      {publicNavItems.map((item) => (
                        <SheetClose key={item.path} asChild>
                          <Link
                            to={item.path}
                            className={`flex items-center space-x-3 space-x-reverse p-3 rounded-md text-lg font-medium transition-colors ${
                              location.pathname === item.path
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                            }`}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                    
                    <div className="mt-auto pt-6">
                      <SheetClose asChild>
                        <Button asChild className="w-full text-lg py-6">
                          <Link to="/register">ابدأ الآن</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-muted/50 dark:bg-gray-900">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">أكاديمية عاكفين</h3>
              <p className="text-muted-foreground dark:text-gray-400 text-sm">
                رحلتك مع القرآن الكريم تبدأ هنا. تعلم واحفظ وارتقِ من أي مكان في العالم مع أفضل المعلمين.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
                <li><Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
                <li><Link to="/packages" className="hover:text-primary transition-colors">الباقات</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
                <li><Link to="/register" className="hover:text-primary transition-colors">التسجيل</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">اتصل بنا</h4>
              {isLoading ? (
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse"><Loader2 className="h-4 w-4 animate-spin"/> <span>جاري التحميل...</span></div>
                </div>
              ) : (
                <div className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${siteContent?.email}`}>{siteContent?.email}</a>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${siteContent?.phone}`} dir="ltr">{siteContent?.phone}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground dark:text-gray-400">
            <p>© 2024 أكاديمية عاكفين. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Buttons */}
      {!isAdminPage && (
        <>
          {siteContent?.phone && <WhatsAppFloat phoneNumber={siteContent.phone} />}
          <ScrollToTopButton />
        </>
      )}
    </div>
  );
};

export default Layout;
