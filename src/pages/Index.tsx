
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, Clock, Star, Heart, Award, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react'; // تأكد من استيراد الأيقونات

const API_BASE_URL = "https://tibyanacademy.runasp.net/api";
const IMAGE_BASE_URL = "https://tibyanacademy.runasp.net";

// --- Helper Function for Image URLs ---
const getFullImageUrl = (url: string | undefined) => {
    if (!url) return './placeholder.svg';
    if (url.startsWith('http') || url.startsWith('https')) {
        return url; // It's already a full URL (from Cloudinary)
    }
    return `${IMAGE_BASE_URL}${url}`; // It's a relative URL
};

// --- Type Definitions ---
interface Package {
  id: number;
  name: string;
  description?: string; // Optional description
  price: number;
  features: string[];
  isActive: boolean;
  isFeatured: boolean;
}

interface Testimonial {
  id: number;
  studentName: string;
  country?: string;
  testimonialText: string;
  imageUrl?: string;
  isActive: boolean;
}

interface Teacher {
  id: number;
  name: string;
  title: string;
  imageUrl?: string;
  isActive: boolean;
}

// --- API Fetching Functions ---
const fetchActivePackages = async (): Promise<Package[]> => {
  const response = await fetch(`${API_BASE_URL}/Packages/GetAllPackages`);
  if (!response.ok) throw new Error("Failed to fetch packages.");
  const allPackages: Package[] = await response.json();
  return allPackages.filter(pkg => pkg.isActive);
}

const fetchActiveTestimonials = async (): Promise<Testimonial[]> => {
  const response = await fetch(`${API_BASE_URL}/Testimonials/GetActiveTestimonials`);
  if (!response.ok) throw new Error("Failed to fetch testimonials.");
  return response.json(); 
};

const fetchActiveTeachers = async (): Promise<Teacher[]> => {
  const response = await fetch(`${API_BASE_URL}/Teacher/GetActiveTeachers`);
  if (!response.ok) throw new Error("Failed to fetch teachers.");
  return response.json();
};


// --- Motion Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}


// --- Dynamic Section Components ---

const TeachersSection = () => {
  const { data: teachers, isLoading, error } = useQuery<Teacher[], Error>({
    queryKey: ['activeTeachersHome'], 
    queryFn: fetchActiveTeachers,
  });

  return (
    <motion.section
      className="py-20"
      variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">تعرّف على نخبة من معلمينا</h2>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p>عفواً، لم نتمكن من تحميل قائمة المعلمين حالياً.</p>
          </div>
        )}

        {teachers && teachers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teachers.slice(0, 4).map(teacher => (
              <motion.div variants={itemVariants} key={teacher.id}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                     <img 
                        src={getFullImageUrl(teacher.imageUrl)}
                        alt={teacher.name} 
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary/20"
                        onError={(e) => { e.currentTarget.src = './placeholder.svg'; }}
                      />
                     <h3 className="text-xl font-semibold mb-2">{teacher.name}</h3>
                     <p className="text-muted-foreground">{teacher.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {teachers && teachers.length > 4 && (
           <div className="text-center mt-12">
                <Button asChild variant="outline">
                    <Link to="/about">مشاهدة كل المعلمين</Link>
                </Button>
            </div>
        )}
      </div>
    </motion.section>
  );
}


const TestimonialsSection = () => {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[], Error>({
    queryKey: ['activeTestimonials'],
    queryFn: fetchActiveTestimonials,
  });

  const [orderedTestimonials, setOrderedTestimonials] = useState<Testimonial[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // 1. تحديث القائمة عند وصول البيانات
  useEffect(() => {
    if (testimonials) {
      setOrderedTestimonials(testimonials);
    }
  }, [testimonials]);

  // 2. التعامل مع حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // دوال التحريك اليدوي
  // تحريك لليمين (السابق): نأخذ آخر عنصر ونضعه في البداية
  const handlePrev = () => {
    setOrderedTestimonials((prev) => {
      const copy = [...prev];
      const lastItem = copy.pop();
      if (lastItem) copy.unshift(lastItem);
      return copy;
    });
  };

  // تحريك لليسار (التالي): نأخذ أول عنصر ونضعه في النهاية
  const handleNext = () => {
    setOrderedTestimonials((prev) => {
      const copy = [...prev];
      const firstItem = copy.shift();
      if (firstItem) copy.push(firstItem);
      return copy;
    });
  };

  // 3. التدوير التلقائي
  useEffect(() => {
    if (!orderedTestimonials || orderedTestimonials.length <= itemsPerPage) return;

    // ملاحظة: عند الضغط يدوياً، سيتم إعادة تعيين هذا المؤقت تلقائياً
    // لأن orderedTestimonials ستتغير، مما يعيد تشغيل هذا الـ useEffect
    const interval = setInterval(() => {
      handlePrev(); // نستخدم نفس منطق التحريك التلقائي (دخول من اليسار)
    }, 5000);

    return () => clearInterval(interval);
  }, [orderedTestimonials, itemsPerPage]);

  return (
    <motion.section
      className="py-16 overflow-hidden bg-gray-50/50" // خلفية خفيفة جداً لإبراز الكروت البيضاء
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="container relative"> {/* relative مهم لتموضع الأزرار */}
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl text-[#0a1f44]">ماذا قال طلابنا عنا؟</h2>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p>عفواً، لم نتمكن من تحميل آراء الطلاب حالياً.</p>
          </div>
        )}

        {orderedTestimonials && orderedTestimonials.length > 0 && (
          <div className="relative group"> 
            
            {/* === زر التنقل لليمين (السابق) === */}
            <button 
              onClick={handlePrev}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-1/2 lg:translate-x-full 
                         bg-white border border-gray-200 text-gray-700 p-3 rounded-full shadow-lg 
                         hover:bg-primary hover:text-white transition-all duration-300
                         hidden md:flex items-center justify-center focus:outline-none"
              aria-label="Previous"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* === زر التنقل لليسار (التالي) === */}
            <button 
              onClick={handleNext}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-1/2 lg:-translate-x-full
                         bg-white border border-gray-200 text-gray-700 p-3 rounded-full shadow-lg 
                         hover:bg-primary hover:text-white transition-all duration-300
                         hidden md:flex items-center justify-center focus:outline-none"
              aria-label="Next"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* حاوية الكروت */}
            <div className="flex justify-center gap-6 py-4 px-2" dir="ltr">
               <AnimatePresence initial={false} mode="popLayout">
                  {orderedTestimonials.slice(0, itemsPerPage).map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    >
                      <Card className="h-full flex flex-col text-right hover:shadow-md transition-all duration-300 border border-gray-100 bg-white rounded-xl" dir="rtl">
                        <CardContent className="p-8 flex flex-col h-full justify-between">
                          <div className="flex mb-4 justify-end">
                            {[...Array(5)].map((_, i) => (
                               <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
                            ))}
                          </div>

                          {item.imageUrl && (
                            <div className="mb-4 rounded-full overflow-hidden border border-gray-100 mx-auto w-16 h-16 shadow-sm">
                               <img 
                                 src={item.imageUrl} 
                                 alt={item.studentName} 
                                 className="w-full h-full object-cover" 
                                 onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                               />
                            </div>
                          )}

                          <p className="text-gray-600 mb-6 flex-grow text-right text-sm leading-7 font-medium">
                            "{item.testimonialText}"
                          </p>

                          <div className="mt-auto pt-4 border-t border-gray-50 text-right">
                             <div className="font-bold text-gray-900 text-sm">
                                {item.studentName}
                             </div>
                             {item.country && <span className="text-xs text-gray-400 mt-1 block">{item.country}</span>}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>

            {/* أزرار للموبايل تظهر في الأسفل فقط للشاشات الصغيرة */}
            <div className="flex justify-center gap-4 mt-6 md:hidden">
                <button onClick={handlePrev} className="p-2 rounded-full bg-white border shadow-sm active:scale-95 transition-transform"><ChevronRight /></button>
                <button onClick={handleNext} className="p-2 rounded-full bg-white border shadow-sm active:scale-95 transition-transform"><ChevronLeft /></button>
            </div>

          </div>
        )}
      </div>
    </motion.section>
  );
}
const PricingSection = () => {
  const { data: packages, isLoading, error } = useQuery<Package[], Error>({
    queryKey: ['activePackages'],
    queryFn: fetchActivePackages,
  });

  // Filter for featured packages to display on the homepage
  const featuredPackages = packages?.filter(pkg => pkg.isFeatured);

  return (
     <motion.section
        className="py-20 bg-gray-100/30 dark:bg-gray-900/40"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">اختر الباقة التي تناسبك</h2>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center text-red-500">
              <p>عفواً، لم نتمكن من تحميل الباقات حالياً.</p>
            </div>
          )}

          {featuredPackages && featuredPackages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.slice(0, 3).map(pkg => (
                <motion.div variants={itemVariants} key={pkg.id}>
                    <Card className={`relative h-full flex flex-col`}>
                        <CardHeader className="text-center">
                            <CardTitle>{pkg.name}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-2 min-h-[40px]">{pkg.description}</p>
                            <div className="text-4xl font-bold my-2">${pkg.price}</div>
                            <div className="text-sm text-muted-foreground">شهرياً</div>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                            <ul className="space-y-3 mb-6 flex-grow">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button asChild className="w-full mt-auto">
                               <Link to={`/register?packageId=${pkg.id}`}>اشترك الآن</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* This button shows if there are more packages (featured or not) than displayed */}
          {packages && packages.length > 3 && (
             <div className="text-center mt-12">
                <Button asChild variant="outline">
                    <Link to="/packages">مشاهدة كل الباقات</Link>
                </Button>
            </div>
          )}

        </div>
      </motion.section>
  )
}

// --- Main Page Component ---
const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/hero-background.webp')" }}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl" variants={itemVariants}>
               أنِر قلبك بنور القرآن
            </motion.h1>
            <motion.h2 className="mt-6 text-xl font-medium text-gray-200 sm:text-2xl" variants={itemVariants}>
              رحلتك لحفظ كتاب الله تبدأ من هنا
            </motion.h2>
            <motion.p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
              نقدم حلقات قرآنية فردية عبر الإنترنت مع نخبة من المعلمين والمعلمات المتخصصين لجميع الأعمار والمستويات
            </motion.p>
            <motion.div className="mt-10" variants={itemVariants}>
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/register">احجز جلستك التجريبية المجانية</Link>
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
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">لماذا تختار أكاديمية عاكفين؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <Card className="text-center h-full transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"><CardContent className="p-8"><Award className="w-12 h-12 mx-auto mb-4 text-emerald-600" /><h3 className="text-xl font-semibold mb-4">معلمون مجازون ومهرة</h3></CardContent></Card>
             <Card className="text-center h-full transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"><CardContent className="p-8"><Heart className="w-12 h-12 mx-auto mb-4 text-amber-600" /><h3 className="text-xl font-semibold mb-4">منهجية مخصصة</h3></CardContent></Card>
             <Card className="text-center h-full transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"><CardContent className="p-8"><Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" /><h3 className="text-xl font-semibold mb-4">مرونة في المواعيد</h3></CardContent></Card>
          </div>
        </div>
      </motion.section>

      {/* === DYNAMIC SECTIONS === */}
      <TeachersSection />
      <PricingSection />
      <TestimonialsSection />
      
      {/* Final CTA */}
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
  )
}

export default Index