
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// --- API Base URL ---
const API_BASE_URL = "https://tibyanacademy.runasp.net";

interface SiteContent {
  [key: string]: string;
}

interface Teacher {
  id: number;
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
  isActive: boolean;
}

const About = () => {
  const [content, setContent] = useState<SiteContent>({});
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch site content and active teachers in parallel
        const [contentRes, teachersRes] = await Promise.all([
          axios.get<SiteContent>(`${API_BASE_URL}/api/sitecontent`),
          axios.get<Teacher[]>(`${API_BASE_URL}/api/teachers`)
        ]);
        setContent(contentRes.data);
        setTeachers(teachersRes.data);
      } catch (error) {
        console.error("Failed to fetch about page data:", error);
        // You might want to set some error state here
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <motion.section
        className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            من نحن
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {isLoading ? <Skeleton className="h-6 w-3/4 mx-auto" /> : (content.about_us_headline || 'في أكاديمية تبيان، نجمع بين أصالة التعليم القرآني ومرونة التقنية الحديثة لنوفر لكم تجربة تعليمية فريدة.')}
          </p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">رسالتنا ورؤيتنا</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/about-us-placeholder.jpg" // A more relevant placeholder
                alt="Quran Learning"
                className="rounded-lg shadow-lg w-full h-auto object-cover aspect-video"
              />
            </motion.div>
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-3">
                  <Target className="w-8 h-8 text-primary" />
                  رسالتنا
                </h3>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {content.our_mission_text || 'توفير تعليم قرآني عالي الجودة عبر الإنترنت، يجمع بين الدقة في التلقين والمرونة في الجدولة، مع التركيز على بناء علاقة روحية قوية بين الطالب والقرآن.'}
                  </p>
                )}
              </motion.div>
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-3">
                  <Eye className="w-8 h-8 text-primary" />
                   رؤيتنا
                </h3>
                {isLoading ? (
                   <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {content.our_vision_text || 'أن نكون الأكاديمية الرائدة عالميًا في تعليم القرآن الكريم عن بعد، ونصل بنور القرآن إلى كل بيت، ونخرّج أجيالاً حافظة وفاهمة لكتاب الله.'}
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Teachers Section */}
       <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">هيئة التدريس</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نخبة من المعلمين والمعلمات المهرة والمجازين، ملتزمون بنقل علمهم بإخلاص وإتقان.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Skeleton className="w-24 h-24 rounded-full mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              teachers.map(teacher => (
                <motion.div key={teacher.id} variants={fadeIn}>
                  <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                     <CardContent className="flex flex-col items-center p-6">
                       <img
                         src={teacher.imageUrl ? `${API_BASE_URL}${teacher.imageUrl}` : '/images/default-avatar.png'}
                         alt={teacher.name}
                         className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary/20 shadow-md"
                       />
                       <h3 className="text-lg font-semibold text-primary">{teacher.name}</h3>
                       <p className="text-sm text-muted-foreground">{teacher.title}</p>
                     </CardContent>
                   </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
         <div className="container mx-auto px-4">
           <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">قيمنا الأساسية</h2>
          </motion.div>
           <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
             {/* Values remain static as they are core to the brand */}
             <motion.div variants={fadeIn}>
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>الإخلاص</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>الإتقان</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>المرونة</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
           </motion.div>
         </div>
       </section>
    </div>
  );
};

export default About;
