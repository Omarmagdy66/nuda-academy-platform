
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { User, BookOpen, Home, UserPlus } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'الدورات', path: '/courses', icon: BookOpen },
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

          <div className="flex items-center space-x-4 space-x-reverse">
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex">
              <Link to="/register">ابدأ الآن</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">أكاديمية نور الهُدى</h3>
              <p className="text-muted-foreground text-sm">
                رحلتك مع القرآن الكريم تبدأ هنا. تعلم واحفظ وارتقِ من أي مكان في العالم مع أفضل المعلمين.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
                <li><Link to="/courses" className="hover:text-primary transition-colors">الدورات</Link></li>
                <li><Link to="/register" className="hover:text-primary transition-colors">التسجيل</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">اتصل بنا</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>البريد الإلكتروني: info@nooralhudalacademy.com</p>
                <p>الهاتف: +966 50 123 4567</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 أكاديمية نور الهُدى. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
