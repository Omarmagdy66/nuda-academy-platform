
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Users, Clock, Star, BookOpen, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-emerald-950 dark:via-background dark:to-amber-950">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-amber-600/10"></div>
        <div className="container relative py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                أنِر قلبك بنور القرآن
              </span>
            </h1>
            <h2 className="mt-6 text-xl font-medium text-muted-foreground sm:text-2xl">
              رحلتك لحفظ كتاب الله تبدأ من هنا
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
              نقدم حلقات قرآنية فردية عبر الإنترنت مع نخبة من المعلمين والمعلمات المتخصصين لجميع الأعمار والمستويات
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/register">
                  احجز جلستك التجريبية المجانية
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">لماذا تختار أكاديمية نور الهدى؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-8">
                <Award className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
                <h3 className="text-xl font-semibold mb-4">معلمون مجازون ومهرة</h3>
                <p className="text-muted-foreground">
                  نخبة من المعلمين والمعلمات المجازين في القراءات والتجويد مع سنوات من الخبرة
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-amber-200 dark:border-amber-800">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-semibold mb-4">منهجية مخصصة لكل طالب</h3>
                <p className="text-muted-foreground">
                  خطة تعليمية مصممة خصيصاً لمستوى الطالب وأهدافه في الحفظ والتلاوة
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-blue-200 dark:border-blue-800">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-4">مرونة في المواعيد تناسبك</h3>
                <p className="text-muted-foreground">
                  جدولة مرنة تتيح لك التعلم في الوقت الذي يناسبك أينما كنت في العالم
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">رحلتك معنا في 3 خطوات بسيطة</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">سجل واختر باقتك</h3>
              <p className="text-muted-foreground">قم بالتسجيل واختر الباقة التي تناسب احتياجاتك وجدولك الزمني</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">احجز جلستك الأولى</h3>
              <p className="text-muted-foreground">اختر المعلم المناسب واحجز موعد جلستك التجريبية المجانية</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">ابدأ رحلتك القرآنية</h3>
              <p className="text-muted-foreground">ابدأ التعلم مع معلمك المختص وحقق أهدافك في الحفظ والتلاوة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">تعرّف على معلميك المهرة</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">الأستاذ محمد الأحمد</h3>
                <p className="text-muted-foreground mb-4">
                  مجاز في القراءات العشرة وخبرة 10 سنوات في التعليم عن بعد. متخصص في تحفيظ جزء عم والأحزاب الأولى
                </p>
                <Badge variant="secondary">إجازة في القراءات العشرة</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">الأستاذة فاطمة السيد</h3>
                <p className="text-muted-foreground mb-4">
                  مجازة في رواية حفص عن عاصم وحاصلة على إجازة في التجويد. متخصصة في تعليم النساء والأطفال
                </p>
                <Badge variant="secondary">إجازة في التجويد والقراءات</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">اختر الباقة التي تناسبك</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>باقة البركة</CardTitle>
                <CardDescription>للمبتدئين والمتعلمين الجدد</CardDescription>
                <div className="text-3xl font-bold">150 ريال</div>
                <div className="text-sm text-muted-foreground">شهرياً</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>8 حصص شهرياً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>حصة مدتها 30 دقيقة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>متابعة يومية</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">اشترك الآن</Button>
              </CardContent>
            </Card>
            
            <Card className="border-emerald-200 dark:border-emerald-800 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600">
                الأكثر شيوعاً
              </Badge>
              <CardHeader className="text-center">
                <CardTitle>باقة الإتقان</CardTitle>
                <CardDescription>للطلاب المتوسطين</CardDescription>
                <div className="text-3xl font-bold">220 ريال</div>
                <div className="text-sm text-muted-foreground">شهرياً</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>12 حصة شهرياً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>حصة مدتها 45 دقيقة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>متابعة يومية + تقارير أسبوعية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>مراجعات إضافية</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">اشترك الآن</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <CardTitle>باقة الهمة</CardTitle>
                <CardDescription>للطلاب المتقدمين</CardDescription>
                <div className="text-3xl font-bold">300 ريال</div>
                <div className="text-sm text-muted-foreground">شهرياً</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>16 حصة شهرياً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>حصة مدتها 60 دقيقة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>متابعة مكثفة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>إجازة مع إتمام الحفظ</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">اشترك الآن</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">ماذا قال طلابنا عنا؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "تجربة رائعة مع الأستاذ محمد. طريقة التدريس واضحة والمتابعة ممتازة. أنصح بهذه الأكاديمية بقوة."
                </p>
                <div>
                  <div className="font-semibold">أحمد السيد</div>
                  <div className="text-sm text-muted-foreground">المملكة العربية السعودية</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "استطعت حفظ جزء عم كاملاً في 6 أشهر فقط! الأستاذة فاطمة صبورة ومتفهمة جداً."
                </p>
                <div>
                  <div className="font-semibold">مريم أحمد</div>
                  <div className="text-sm text-muted-foreground">دولة الإمارات</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "المرونة في المواعيد ساعدتني كثيراً. التطبيق سهل الاستخدام والتفاعل مع المعلم ممتاز."
                </p>
                <div>
                  <div className="font-semibold">عبدالله محمد</div>
                  <div className="text-sm text-muted-foreground">مصر</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">الأسئلة الشائعة</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>هل المعلمون مجازون؟</AccordionTrigger>
                <AccordionContent>
                  نعم، جميع معلمينا حاصلون على إجازات معتمدة في القراءات والتجويد من علماء مختصين، ولديهم خبرة واسعة في التدريس عن بعد.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>هل الحلقات فردية؟</AccordionTrigger>
                <AccordionContent>
                  نعم، جميع الحلقات فردية لضمان أقصى استفادة وتركيز شخصي مع كل طالب حسب مستواه وقدراته.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>ما هي طرق الدفع المتاحة؟</AccordionTrigger>
                <AccordionContent>
                  نوفر عدة طرق دفع مريحة: التحويل البنكي، المحافظ الإلكترونية، وبطاقات الائتمان. جميع المعاملات آمنة ومشفرة.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>هل يمكنني تغيير موعد الحصة؟</AccordionTrigger>
                <AccordionContent>
                  نعم، يمكنك إعادة جدولة الحصص قبل 24 ساعة من الموعد المحدد دون أي رسوم إضافية.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>ما هي متطلبات التقنية للحصص؟</AccordionTrigger>
                <AccordionContent>
                  تحتاج فقط إلى اتصال إنترنت مستقر وجهاز (حاسوب، جهاز لوحي، أو هاتف ذكي) مع كاميرا وميكروفون للتفاعل مع المعلم.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-amber-600">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-6 sm:text-4xl">
            هل أنت مستعد لتبدأ رحلتك مع القرآن؟
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف الطلاب الذين حققوا أهدافهم في حفظ القرآن الكريم معنا
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
            <Link to="/register">
              نعم، أريد جلستي التجريبية المجانية
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
