
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, BookHeart, Users, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const API_BASE_URL = "https://tibyanacademy.runasp.net/api";
const IMAGE_BASE_URL = "https://tibyanacademy.runasp.net";

// --- Type Definition ---
interface Teacher {
  id: number;
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
  isActive: boolean;
  gender: 'Male' | 'Female'; // Added gender property
}

// --- Helper Function for Image URLs ---
const getFullImageUrl = (url: string | undefined) => {
    if (!url) return './placeholder.svg';
    if (url.startsWith('http') || url.startsWith('https')) {
        return url;
    }
    return `${IMAGE_BASE_URL}${url}`;
};

// --- API Fetching Function ---
const fetchActiveTeachers = async (): Promise<Teacher[]> => {
  const response = await fetch(`${API_BASE_URL}/Teacher/GetActiveTeachers`);
  if (!response.ok) throw new Error("Failed to fetch teachers.");
  return response.json();
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
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

// --- Teacher Card Component ---
const TeacherCard = ({ teacher }: { teacher: Teacher }) => (
    <motion.div variants={fadeInVariants}>
        <Card className="text-center h-full hover:shadow-lg transition-shadow border-0 bg-white dark:bg-gray-800/50">
            <CardContent className="p-6 flex flex-col items-center">
                <img 
                    src={getFullImageUrl(teacher.imageUrl)}
                    alt={teacher.name}
                    className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-gray-800 shadow-md"
                    onError={(e) => { e.currentTarget.src = './placeholder.svg'; }}
                />
                <h3 className="text-xl font-semibold mb-1">{teacher.name}</h3>
                <p className="text-primary font-medium mb-2">{teacher.title}</p>
                {teacher.bio && <p className="text-muted-foreground text-sm">{teacher.bio}</p>}
            </CardContent>
        </Card>
    </motion.div>
);

// --- Teachers Section Component ---
const TeachersSection = () => {
  const { data: teachers, isLoading, error } = useQuery<Teacher[], Error>({
    queryKey: ['activeTeachersAboutPage'],
    queryFn: fetchActiveTeachers,
  });

  const maleTeachers = teachers?.filter(t => t.gender === 'Male');
  const femaleTeachers = teachers?.filter(t => t.gender === 'Female');

  return (
    <motion.section 
      className="py-16 bg-muted/30 dark:bg-gray-900/40"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInVariants}
    >
      <div className="container">
        <motion.div className="text-center mb-12" variants={fadeInVariants}>
          <h2 className="text-3xl md:text-4xl font-bold">فريقنا من المعلمين المهرة</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            نفخر بوجود نخبة من المعلمين والمعلمات المجازين وذوي الخبرة الذين يكرسون وقتهم لخدمة كتاب الله.
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-10">
            <p>عفواً، لم نتمكن من تحميل قائمة المعلمين حالياً.</p>
          </div>
        )}
        
        {teachers && teachers.length === 0 && !isLoading && !error && (
            <div className="text-center text-muted-foreground py-10">
                <p>لم يتم إضافة معلمين فعالين بعد.</p>
            </div>
        )}

        {/* --- Male Teachers Section --- */}
        {maleTeachers && maleTeachers.length > 0 && (
          <motion.div className="mb-16" variants={fadeInVariants}>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">المعلمون</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {maleTeachers.map(teacher => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          </motion.div>
        )}

        {/* --- Female Teachers Section --- */}
        {femaleTeachers && femaleTeachers.length > 0 && (
          <motion.div variants={fadeInVariants}>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">المعلمات</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {femaleTeachers.map(teacher => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </motion.section>
  );
}

const About = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <motion.section
        className="py-20 md:py-28 text-center bg-gradient-to-b from-primary/5 via-transparent to-transparent"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <div className="container">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gradient mb-4"
            variants={fadeInVariants}
          >
            عن أكاديمية عاكفين
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={fadeInVariants}
          >
            منصة تعليمية رائدة متخصصة في تحفيظ القرآن الكريم وعلومه عن بعد، بإشراف نخبة من المعلمين المهرة والمجازين.
          </motion.p>
        </div>
      </motion.section>

      {/* Our Mission and Vision */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
      >
        <div className="container grid md:grid-cols-2 gap-12 items-center">
           <motion.div variants={fadeInVariants}>
            <Card className="border-0 shadow-lg h-full">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">رسالتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  توفير تعليم قرآني عالي الجودة ومتاح للجميع حول العالم، باستخدام أحدث التقنيات لتمكين الطلاب من حفظ كتاب الله وفهمه وتطبيقه.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInVariants}>
            <Card className="border-0 shadow-lg h-full">
              <CardContent className="p-8 flex flex-col items-center text-center">
                 <div className="p-3 bg-secondary/10 rounded-full mb-4">
                   <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">رؤيتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون الأكاديمية الرائدة عالمياً في تعليم القرآن عن بعد، ونخرّج أجيالاً حافظة لكتاب الله، عاملة به، وداعمة لمجتمعاتها.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
      
      {/* === DYNAMIC TEACHERS SECTION === */}
      <TeachersSection />

      {/* Our Values */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
      >
        <div className="container">
          <motion.div className="text-center mb-12" variants={fadeInVariants}>
            <h2 className="text-3xl md:text-4xl font-bold">قيمنا الأساسية</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              الأسس التي نعتمد عليها في رحلتنا التعليمية لخدمة كتاب الله.
            </p>
          </motion.div>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={fadeInVariants}
          >
            {[
              { icon: BookHeart, title: 'الإخلاص', description: 'نسعى لتعليم كتاب الله بنية خالصة لوجهه الكريم.' },
              { icon: CheckCircle, title: 'الإتقان', description: 'نلتزم بأعلى معايير الجودة في التعليم والمتابعة.' },
              { icon: Users, title: 'الاهتمام الفردي', description: 'نوفر خططاً مخصصة لكل طالب حسب قدراته وأهدافه.' },
            ].map(value => (
              <motion.div key={value.title} variants={fadeInVariants}>
                <Card className="text-center p-6 h-full hover:shadow-md transition-shadow border-0">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-20 bg-muted/20 dark:bg-gray-900/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInVariants}
      >
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            انضم إلى رحلتنا القرآنية
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            ابدأ الآن رحلتك في حفظ وتدبر القرآن الكريم مع نخبة من المعلمين المتخصصين.
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link to="/register">سجل في جلسة تجريبية مجانية</Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
