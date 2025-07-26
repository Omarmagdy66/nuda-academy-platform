
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, BookHeart, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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

const AboutUs = () => {
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
            عن أكاديمية نور الهُدى
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
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">رسالتنا</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                توفير تعليم قرآني عالي الجودة ومتاح للجميع حول العالم، باستخدام أحدث التقنيات التعليمية لتمكين الطلاب من حفظ كتاب الله وفهم معانيه وتطبيق أحكامه بكل يسر وسهولة.
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInVariants}>
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex-row items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-full">
                   <Eye className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                أن نكون الأكاديمية الرائدة عالمياً في تعليم القرآن الكريم عن بعد، وأن نخرّج أجيالاً قرآنية حافظة لكتاب الله، عاملة به، وداعمة لمجتمعاتها بالقيم الإسلامية السامية.
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Our Values */}
      <motion.section 
        className="py-16 bg-muted/30 dark:bg-gray-900/40"
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
                <Card className="text-center p-6 h-full hover:shadow-md transition-shadow">
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
        className="py-20"
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

export default AboutUs;
