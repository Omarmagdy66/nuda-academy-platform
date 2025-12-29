
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // FINAL FIX: Use the HTTPS endpoint to prevent mixed content errors.
    const targetUrl = 'https://tibyanacademy.runasp.net/api/Auth/login';

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseBody = await response.text();

      if (response.ok) {
        const data = JSON.parse(responseBody);
        const token = data.token;

        if (token && typeof token === 'string' && token.trim().length > 0) {
          localStorage.setItem('token', token.trim());
          toast({
            title: 'تم تسجيل الدخول بنجاح',
            description: 'أهلاً بك مجدداً!',
          });
          // ROUTING FIX: Redirect to the correct admin dashboard path.
          navigate('/admin');
        } else {
          console.error('Login successful, but no valid token was found.', { responseBody });
          toast({
            title: 'خطأ في استجابة الخادم',
            description: 'لم يتم العثور على رمز مميز صالح في الاستجابة.',
            variant: 'destructive',
          });
        }
      } else {
        const { status } = response;
        const errorDetails = responseBody;

        console.error(`Login failed with status ${status}:`, errorDetails);
        toast({
          title: `فشل تسجيل الدخول (Status: ${status})`,
          description: errorDetails || 'يرجى التحقق من بيانات الاعتماد الخاصة بك.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('A network or other unexpected error occurred:', error);
      let description = 'حدث خطأ غير متوقع.';
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        description = 'فشل الاتصال بالخادم. هذا غالباً بسبب خطأ CORS أو مشكلة في الشبكة.';
      }
      toast({
        title: 'خطأ في الشبكة أو خطأ غير متوقع',
        description: description,
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      className="container py-20 flex items-center justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">تسجيل الدخول</CardTitle>
          <CardDescription>أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى حسابك.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              تسجيل الدخول
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoginPage;
