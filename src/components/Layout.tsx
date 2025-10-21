
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import WhatsAppFloat from './WhatsAppFloat';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { User, BookOpen, Home, UserPlus, Menu, X, Info, Package } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const whatsappNumber = '+966501234567';
  const isAdminPage = location.pathname.includes('/admin');

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'الباقات', path: '/packages', icon: Package },
    { name: 'من نحن', path: '/about', icon: Info },
    { name: 'تسجيل الدخول', path: '/login', icon: User },
    { name: 'لوحة الطالب', path: '/dashboard', icon: User },
    { name: 'التسجيل', path: '/register', icon: UserPlus },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">ن</span>
              </div>
              <span className="font-bold text-lg text-gradient">أكاديمية نور الهُدى</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navItems.map((item) => (
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
            
            {/* Mobile Menu */}
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
                      {navItems.map((item) => (
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

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 dark:bg-gray-900">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">أكاديمية نور الهُدى</h3>
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
              <div className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
                <p>البريد الإلكتروني: info@nooralhudalacademy.com</p>
                <p>الهاتف: +966 50 123 4567</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground dark:text-gray-400">
            <p>© 2024 أكاديمية نور الهُدى. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
      
      {!isAdminPage && <WhatsAppFloat phoneNumber={whatsappNumber} />}
    </div>
  );
};

export default Layout;
