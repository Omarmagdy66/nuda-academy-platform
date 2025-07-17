import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, User, Lock, BookOpen } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.userType) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock authentication
      if (formData.email === 'admin@academy.com' && formData.password === 'admin123') {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة التحكم الإدارية"
        });
        navigate('/admin');
      } else if (formData.userType === 'teacher') {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة المعلم"
        });
        navigate('/teacher');
      } else if (formData.userType === 'student') {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة الطالب"
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      {/* Islamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 opacity-8">
          <img 
            src="https://images.pexels.com/photos/6032877/pexels-photo-6032877.jpeg?auto=compress&cs=tinysrgb&w=400" 
            alt="Islamic geometric pattern" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute bottom-32 left-16 w-28 h-28 opacity-8">
          <img 
            src="https://images.pexels.com/photos/6032877/pexels-photo-6032877.jpeg?auto=compress&cs=tinysrgb&w=400" 
            alt="Mosque dome" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute top-1/2 left-8 w-20 h-20 opacity-8">
          <img 
            src="https://images.pexels.com/photos/6032877/pexels-photo-6032877.jpeg?auto=compress&cs=tinysrgb&w=300" 
            alt="Islamic calligraphy" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute top-32 right-1/3 w-16 h-16 opacity-8">
          <img 
            src="https://images.pexels.com/photos/6032877/pexels-photo-6032877.jpeg?auto=compress&cs=tinysrgb&w=300" 
            alt="Islamic star pattern" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            أكاديمية نور الهُدى
          </h1>
          <p className="text-muted-foreground">
            تسجيل الدخول إلى حسابك
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
            <CardDescription className="text-center">
              أدخل بياناتك للوصول إلى حسابك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type */}
              <div className="space-y-2">
                <Label htmlFor="userType">نوع المستخدم *</Label>
                <Select value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المستخدم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">طالب</SelectItem>
                    <SelectItem value="teacher">معلم</SelectItem>
                    <SelectItem value="admin">إداري</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  البريد الإلكتروني *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="text-left"
                  dir="ltr"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  كلمة المرور *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full text-lg py-6 mt-6" 
                disabled={isLoading}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">بيانات تجريبية:</h4>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <p><strong>إداري:</strong> admin@academy.com / admin123</p>
                  <p><strong>معلم:</strong> أي إيميل + كلمة مرور</p>
                  <p><strong>طالب:</strong> أي إيميل + كلمة مرور</p>
                </div>
              </div>

              {/* Links */}
              <div className="text-center space-y-2 pt-4">
                <p className="text-sm text-muted-foreground">
                  ليس لديك حساب؟{' '}
                  <Link to="/register" className="text-primary hover:underline font-medium">
                    سجل الآن
                  </Link>
                </p>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  العودة للرئيسية
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Islamic Quote */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20 relative overflow-hidden">
            {/* Background Islamic pattern */}
            <div className="absolute inset-0 opacity-5">
              <img 
                src="https://images.pexels.com/photos/6032877/pexels-photo-6032877.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Quran background" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-primary font-semibold text-lg mb-2">
              ﴿ وَقُل رَّبِّ زِدْنِي عِلْماً ﴾
            </p>
            <p className="text-muted-foreground text-sm">
              صدق الله العظيم - سورة طه
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;