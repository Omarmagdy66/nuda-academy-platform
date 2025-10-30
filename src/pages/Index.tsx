
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Users, Clock, Star, BookOpen, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

// --- API Base URL ---
const API_BASE_URL = "https://tibyanacademy.runasp.net";

// --- Interfaces ---
interface Testimonial {
  id: number;
  studentName: string;
  country?: string;
  testimonialText: string;
  imageUrl?: string;
}
interface Teacher {
  id: number;
  name: string;
  title: string;
  imageUrl?: string;
}
interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string; // Assuming features is a comma-separated string
  isMostPopular: boolean;
}
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

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
  // --- State for dynamic data ---
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Fetch all data on component mount ---
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [
          testimonialRes,
          teacherRes,
          packageRes,
          faqRes
        ] = await Promise.all([
          axios.get<Testimonial[]>(`${API_BASE_URL}/api/testimonials`),
          axios.get<Teacher[]>(`${API_BASE_URL}/api/teachers`),
          axios.get<Package[]>(`${API_BASE_URL}/api/packages`),
          axios.get<FAQ[]>(`${API_BASE_URL}/api/faqs`),
        ]);
        setTestimonials(testimonialRes.data);
        // Display only the first 2 teachers on the home page for brevity
        setTeachers(teacherRes.data.slice(0, 2)); 
        setPackages(packageRes.data);
        setFaqs(faqRes.data);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section (Static) */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-emerald-900/80 dark:via-background dark:to-amber-900/80"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container relative py-20 lg:py-32 text-center">
            <motion.h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl" variants={itemVariants}>
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                أنِر قلبك بنور القرآن
              </span>
            </motion.h1>
            <motion.p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto" variants={itemVariants}>
              نقدم حلقات قرآنية فردية عبر الإنترنت مع نخبة من المعلمين والمعلمات المتخصصين لجميع الأعمار والمستويات
            </motion.p>
            <motion.div className="mt-10" variants={itemVariants}>
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/register">احجز جلستك التجريبية المجانية</Link>
              </Button>
            </motion.div>
        </div>
      </motion.section>
      
      {/* Features Section (Static) */}
       <motion.section
        className="py-20 bg-gray-100/30 dark:bg-gray-900/40"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">لماذا تختار أكاديمية تبيان؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <Card className="text-center h-full"><CardContent className="p-8"><Award className="w-12 h-12 mx-auto mb-4 text-emerald-600" /><h3 className="text-xl font-semibold mb-4">معلمون مجازون ومهرة</h3></CardContent></Card>
             <Card className="text-center h-full"><CardContent className="p-8"><Heart className="w-12 h-12 mx-auto mb-4 text-amber-600" /><h3 className="text-xl font-semibold mb-4">منهجية مخصصة</h3></CardContent></Card>
             <Card className="text-center h-full"><CardContent className="p-8"><Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" /><h3 className="text-xl font-semibold mb-4">مرونة في المواعيد</h3></CardContent></Card>
          </div>
        </div>
      </motion.section>

      {/* Teachers Section (Dynamic) */}
      <motion.section
        className="py-20"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">تعرّف على بعض معلمينا</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <Card key={i}><CardContent className="p-6 text-center"><Skeleton className="w-24 h-24 rounded-full mx-auto mb-4"/><Skeleton className="h-6 w-3/4 mx-auto mb-2"/><Skeleton className="h-4 w-1/2 mx-auto"/></CardContent></Card>
              ))
            ) : (
              teachers.map(teacher => (
                <motion.div variants={itemVariants} key={teacher.id}>
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                       <img src={teacher.imageUrl ? `${API_BASE_URL}${teacher.imageUrl}` : '/images/default-avatar.png'} alt={teacher.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary/20"/>
                       <h3 className="text-xl font-semibold mb-2">{teacher.name}</h3>
                       <p className="text-muted-foreground">{teacher.title}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
           <div className="text-center mt-12">
                <Button asChild variant="outline">
                    <Link to="/about">مشاهدة كل المعلمين</Link>
                </Button>
            </div>
        </div>
      </motion.section>

      {/* Pricing Section (Dynamic) */}
      <motion.section
        className="py-20 bg-gray-100/30 dark:bg-gray-900/40"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">اختر الباقة التي تناسبك</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
               Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}><CardHeader><Skeleton className="h-6 w-1/2 mx-auto mb-2"/><Skeleton className="h-4 w-3/4 mx-auto"/></CardHeader><CardContent><Skeleton className="h-24 w-full"/></CardContent></Card>
              ))
            ) : (
              packages.map(pkg => (
                <motion.div variants={itemVariants} key={pkg.id}>
                    <Card className={`h-full flex flex-col ${pkg.isMostPopular ? 'border-primary' : ''}`}>
                        {pkg.isMostPopular && <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">الأكثر شيوعاً</Badge>}
                        <CardHeader className="text-center">
                            <CardTitle>{pkg.name}</CardTitle>
                            <CardDescription>{pkg.description}</CardDescription>
                            <div className="text-4xl font-bold">{pkg.price} ر.س</div>
                            <div className="text-sm text-muted-foreground">شهرياً</div>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                            <ul className="space-y-3 mb-6 flex-grow">
                                {pkg.features.split(',').map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>{feature.trim()}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button asChild className="w-full mt-auto" variant={pkg.isMostPopular ? 'default' : 'outline'}>
                                <Link to="/register">اشترك الآن</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* Testimonials (Dynamic) */}
      <motion.section
        className="py-20"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">ماذا قال طلابنا عنا؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
               Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}><CardContent className="p-6"><Skeleton className="h-20 w-full mb-4"/><Skeleton className="h-5 w-1/2"/></CardContent></Card>
              ))
            ) : (
              testimonials.map(item => (
                <motion.div variants={itemVariants} key={item.id}>
                    <Card className="h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}
                            </div>
                            <p className="text-muted-foreground mb-4 flex-grow">"{item.testimonialText}"</p>
                            <div className="flex items-center gap-3">
                               <img src={item.imageUrl ? `${API_BASE_URL}${item.imageUrl}` : '/images/default-avatar.png'} alt={item.studentName} className="w-12 h-12 rounded-full object-cover"/>
                               <div>
                                 <div className="font-semibold">{item.studentName}</div>
                                 <div className="text-sm text-muted-foreground">{item.country}</div>
                               </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.section>
      
      {/* FAQ (Dynamic) */}
      <motion.section
        className="py-20 bg-gray-100/30 dark:bg-gray-900/40"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="container">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold sm:text-4xl">الأسئلة الشائعة</h2>
            </div>
            <div className="max-w-3xl mx-auto">
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map(faq => (
                            <AccordionItem value={`item-${faq.id}`} key={faq.id}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
      </motion.section>

      {/* Final CTA (Static) */}
      <motion.section
        className="py-20 bg-gradient-to-r from-emerald-600 to-amber-600"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }}>
        <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-6 sm:text-4xl">هل أنت مستعد لتبدأ رحلتك مع القرآن؟</h2>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Link to="/register">نعم، أريد جلستي التجريبية المجانية</Link>
            </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
