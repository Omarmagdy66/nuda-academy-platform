
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle, User, Mail, Users, BookOpen, Phone } from 'lucide-react';

const API_BASE_URL = "https://tibyanacademy.runasp.net";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userType: '',
    course: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.userType || !formData.course) {
      toast({
        title: "بيانات غير مكتملة",
        description: "يرجى ملء جميع الحقول المطلوبة (*)",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        applicantName: formData.fullName,
        applicantEmail: formData.email,
        applicantPhone: formData.phone,
        userType: formData.userType,
        course: formData.course,
        notes: formData.notes
      };
      
      await axios.post(`${API_BASE_URL}/api/applications`, payload);

      setIsSubmitted(true);
      toast({
        title: "تم إرسال طلبك بنجاح!",
        description: "سيتم التواصل معك خلال 24 ساعة لتأكيد التسجيل.",
      });

    } catch (error) {
      console.error('Registration submission failed:', error);
      toast({
        title: "حدث خطأ ما",
        description: "فشل إرسال طلب التسجيل. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div dir="rtl" className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto">
          <Card className="text-center shadow-lg">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-green-700">تم إرسال طلبك بنجاح!</h2>
              <p className="text-muted-foreground mb-6">
                شكراً لك على اهتمامك بأكاديمية تبيان. سيقوم أحد ممثلينا بالتواصل معك خلال 24 ساعة عبر البريد الإلكتروني أو الهاتف لتأكيد طلبك.
              </p>
              <Button asChild className="w-full">
                <a href="/">العودة إلى الصفحة الرئيسية</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">انضم إلينا الآن</h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            املأ النموذج أدناه لبدء رحلتك في تعلم القرآن الكريم معنا.
          </p>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">نموذج طلب التسجيل</CardTitle>
            <CardDescription>سيتم التواصل معك لتأكيد التسجيل وتحديد موعد الجلسة التجريبية.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2"><User className="w-4 h-4" />الاسم الكامل *</Label>
                <Input id="fullName" type="text" placeholder="الاسم الثلاثي" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4" />البريد الإلكتروني *</Label>
                <Input id="email" type="email" placeholder="example@email.com" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="w-4 h-4" />رقم الهاتف (مع رمز الدولة)</Label>
                <Input id="phone" type="tel" placeholder="+966501234567" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Users className="w-4 h-4" />أُسجل بصفتي *</Label>
                    <Select value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)} required>
                    <SelectTrigger><SelectValue placeholder="اختر الخيار المناسب" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="student">طالب (بنفسي)</SelectItem>
                        <SelectItem value="parent">ولي أمر (أسجل لأطفالي)</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><BookOpen className="w-4 h-4" />الدورة المبدئية المطلوبة *</Label>
                    <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)} required>
                    <SelectTrigger><SelectValue placeholder="اختر الدورة" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="quran-reading">تصحيح تلاوة</SelectItem>
                        <SelectItem value="hifz">حفظ القرآن</SelectItem>
                        <SelectItem value="tajweed">تعلم التجويد</SelectItem>
                        <SelectItem value="noorani">القاعدة النورانية (للأطفال والمبتدئين)</SelectItem>
                        <SelectItem value="consultation">لست متأكداً، أحتاج استشارة</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea id="notes" placeholder="هل لديك أهداف محددة؟ أوقات مفضلة؟" value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} className="min-h-[100px]" />
              </div>

              <Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
                {isLoading ? 'جاري الإرسال...' : 'إرسال طلب التسجيل'}
              </Button>

              <p className="text-center text-sm text-muted-foreground">* الحقول مطلوبة لإتمام الطلب</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
