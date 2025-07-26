
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Users, Clock, Star, BookOpen, Heart, Award, Target, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-emerald-900/80 dark:via-background dark:to-amber-900/80"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-amber-600/10"></div>
        
        {/* Background Islamic Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 bg-emerald-200/50 dark:bg-emerald-800/30 rounded-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-32 left-16 w-24 h-24 bg-amber-200/50 dark:bg-amber-800/30 rounded-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </div>
        
        <div className="container relative py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                أنِر قلبك بنور القرآن
              </span>
            </motion.h1>
            <motion.h2
              className="mt-6 text-xl font-medium text-muted-foreground dark:text-gray-300 sm:text-2xl"
              variants={itemVariants}
            >
              رحلتك لحفظ كتاب الله تبدأ من هنا
            </motion.h2>
            <motion.p
              className="mt-6 text-lg leading-8 text-muted-foreground dark:text-gray-400 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              نقدم حلقات قرآنية فردية عبر الإنترنت مع نخبة من المعلمين والمعلمات المتخصصين لجميع الأعمار والمستويات
            </motion.p>
            <motion.div
              className="mt-10"
              variants={itemVariants}
            >
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/register">
                  احجز جلستك التجريبية المجانية
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Bismillah Section */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-emerald-950/80 dark:via-background dark:to-amber-950/80 border-2 border-emerald-100/80 dark:border-emerald-900/50 shadow-lg">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-cairo text-5xl md:text-7xl text-emerald-600/70 dark:text-emerald-400/70 leading-relaxed" style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </h2>
              <p className="mt-6 text-lg text-amber-700/90 dark:text-amber-400/90 font-medium">
                "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ"
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-gray-100/30 dark:bg-gray-900/40"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="container">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold sm:text-4xl">لماذا تختار أكاديمية نور الهدى؟</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={sectionVariants}>
            <motion.div variants={itemVariants}>
              <Card className="text-center border-emerald-200 dark:border-emerald-800 h-full">
                <CardContent className="p-8">
                  <Award className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
                  <h3 className="text-xl font-semibold mb-4">معلمون مجازون ومهرة</h3>
                  <p className="text-muted-foreground dark:text-gray-400">
                    نخبة من المعلمين والمعلمات المجازين في القراءات والتجويد مع سنوات من الخبرة
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="text-center border-amber-200 dark:border-amber-800 h-full">
                <CardContent className="p-8">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                  <h3 className="text-xl font-semibold mb-4">منهجية مخصصة لكل طالب</h3>
                  <p className="text-muted-foreground dark:text-gray-400">
                    خطة تعليمية مصممة خصيصاً لمستوى الطالب وأهدافه في الحفظ والتلاوة
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="text-center border-blue-200 dark:border-blue-800 h-full">
                <CardContent className="p-8">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-4">مرونة في المواعيد تناسبك</h3>
                  <p className="text-muted-foreground dark:text-gray-400">
                    جدولة مرنة تتيح لك التعلم في الوقت الذي يناسبك أينما كنت في العالم
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold sm:text-4xl">رحلتك معنا في 3 خطوات بسيطة</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={sectionVariants}>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">سجل واختر باقتك</h3>
              <p className="text-muted-foreground dark:text-gray-400">قم بالتسجيل واختر الباقة التي تناسب احتياجاتك وجدولك الزمني</p>
            </motion.div>
            
            <motion.div className="text-center" variants={itemVariants}>
              <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">احجز جلستك الأولى</h3>
              <p className="text-muted-foreground dark:text-gray-400">اختر المعلم المناسب واحجز موعد جلستك التجريبية المجانية</p>
            </motion.div>
            
            <motion.div className="text-center" variants={itemVariants}>
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">ابدأ رحلتك القرآنية</h3>
              <p className="text-muted-foreground dark:text-gray-400">ابدأ التعلم مع معلمك المختص وحقق أهدافك في الحفظ والتلاوة</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Teachers Section */}
      <motion.section
        className="py-20 bg-gray-100/30 dark:bg-gray-900/40 relative overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Background Islamic Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 opacity-5">
            <img 
              src="/placeholder.svg?height=100&width=100&text=📿" 
              alt="Islamic Pattern" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-10 right-10 w-16 h-16 opacity-5">
            <img 
              src="/placeholder.svg?height=80&width=80&text=🌙" 
              alt="Islamic Crescent" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        
        <div className="container relative">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold sm:text-4xl">تعرّف على معلميك المهرة</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" variants={sectionVariants}>
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">الأستاذ محمد الأحمد</h3>
                  <p className="text-muted-foreground dark:text-gray-400 mb-4">
                    مجاز في القراءات العشرة وخبرة 10 سنوات في التعليم عن بعد. متخصص في تحفيظ جزء عم والأحزاب الأولى
                  </p>
                  <Badge variant="secondary">إجازة في القراءات العشرة</Badge>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">الأستاذة فاطمة السيد</h3>
                  <p className="text-muted-foreground dark:text-gray-400 mb-4">
                    مجازة في رواية حفص عن عاصم وحاصلة على إجازة في التجويد. متخصصة في تعليم النساء والأطفال
                  </p>
                  <Badge variant="secondary">إجازة في التجويد والقراءات</Badge>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold sm:text-4xl">اختر الباقة التي تناسبك</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={sectionVariants}>
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="text-center">
                  <CardTitle>باقة البركة</CardTitle>
                  <CardDescription>للمبتدئين والمتعلمين الجدد</CardDescription>
                  <div className="text-3xl font-bold">150 ريال</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">شهرياً</div>
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
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="border-emerald-200 dark:border-emerald-800 relative h-full">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600">
                  الأكثر شيوعاً
                </Badge>
                <CardHeader className="text-center">
                  <CardTitle>باقة الإتقان</CardTitle>
                  <CardDescription>للطلاب المتوسطين</CardDescription>
                  <div className="text-3xl font-bold">220 ريال</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">شهرياً</div>
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
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="text-center">
                  <CardTitle>باقة الهمة</CardTitle>
                  <CardDescription>للطلاب المتقدمين</CardDescription>
                  <div className="text-3xl font-bold">300 ريال</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">شهرياً</div>
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
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-20 bg-gray-100/30 dark:bg-gray-900/40 relative overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Background Islamic Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-24 h-24 opacity-5">
            <img 
              src="/placeholder.svg?height=120&width=120&text=🕌" 
              alt="Mosque Silhouette" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-20 left-20 w-20 h-20 opacity-5">
            <img 
              src="/placeholder.svg?height=100&width=100&text=📖" 
              alt="Quran Book" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        
        <div className="container relative">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold sm:text-4xl">ماذا قال طلابنا عنا؟</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={sectionVariants}>
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground dark:text-gray-300 mb-4">
                    "تجربة رائعة مع الأستاذ محمد. طريقة التدريس واضحة والمتابعة ممتازة. أنصح بهذه الأكاديمية بقوة."
                  </p>
                  <div>
                    <div className="font-semibold">أحمد السيد</div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">المملكة العربية السعودية</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground dark:text-gray-300 mb-4">
                    "استطعت حفظ جزء عم كاملاً في 6 أشهر فقط! الأستاذة فاطمة صبورة ومتفهمة جداً."
                  </p>
                  <div>
                    <div className="font-semibold">مريم أحمد</div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">دولة الإمارات</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground dark:text-gray-300 mb-4">
                    "المرونة في المواعيد ساعدتني كثيراً. التطبيق سهل الاستخدام والتفاعل مع المعلم ممتاز."
                  </p>
                  <div>
                    <div className="font-semibold">عبدالله محمد</div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">مصر</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold sm:text-4xl">الأسئلة الشائعة</h2>
          </motion.div>
          <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
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
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="py-20 bg-gradient-to-r from-emerald-600 to-amber-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
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
      </motion.section>
    </div>
  );
};

export default Index;
