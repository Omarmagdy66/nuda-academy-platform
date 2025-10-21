
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const Packages = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <motion.section
        className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            باقاتنا التعليمية
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            اختر الباقة التي تناسب أهدافك وميزانيتك، وابدأ رحلتك في حفظ وتلاوة القرآن الكريم معنا.
          </p>
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
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={sectionVariants}>
            {/* Package 1 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full flex flex-col">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl mb-2">باقة البركة</CardTitle>
                  <CardDescription>للمبتدئين والبدايات الجديدة</CardDescription>
                  <div className="text-4xl font-bold mt-4">150 <span className="text-lg font-medium text-muted-foreground">ريال/شهرياً</span></div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>8 حصص فردية شهرياً</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>مدة الحصة 30 دقيقة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>متابعة مستمرة وواجبات</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button asChild className="w-full text-lg mt-6" variant="outline">
                    <Link to="/register">اختر الباقة</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
            
            {/* Package 2 (Most Popular) */}
            <motion.div variants={itemVariants}>
              <Card className="border-2 border-primary relative h-full flex flex-col">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  الأكثر شيوعاً
                </Badge>
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl mb-2">باقة الإتقان</CardTitle>
                  <CardDescription>للطلاب الجادين والطموحين</CardDescription>
                  <div className="text-4xl font-bold mt-4">220 <span className="text-lg font-medium text-muted-foreground">ريال/شهرياً</span></div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>12 حصة فردية شهرياً</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>مدة الحصة 45 دقيقة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>متابعة مكثفة وتقارير أسبوعية</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>خطة مراجعة مخصصة</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button asChild className="w-full text-lg mt-6">
                     <Link to="/register">اختر الباقة</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
            
            {/* Package 3 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full flex flex-col">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl mb-2">باقة الهمة</CardTitle>
                  <CardDescription>للحفظ المكثف ونيل الإجازة</CardDescription>
                   <div className="text-4xl font-bold mt-4">300 <span className="text-lg font-medium text-muted-foreground">ريال/شهرياً</span></div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>16 حصة فردية شهرياً</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>مدة الحصة 60 دقيقة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>متابعة مكثفة للحفظ والمراجعة</span>
                    </li>
                     <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span>الإعداد لنيل الإجازة القرآنية</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button asChild className="w-full text-lg mt-6" variant="outline">
                     <Link to="/register">اختر الباقة</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Packages;
