
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Eye, ShieldCheck, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
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
            في أكاديمية نور الهُدى، نجمع بين أصالة التعليم القرآني ومرونة التقنية الحديثة لنقدم لكم تجربة تعليمية فريدة.
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
            <h2 className="text-3xl font-bold mb-3">قصتنا ورسالتنا</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              انطلقنا بشغف لخدمة كتاب الله، وهدفنا تسهيل رحلة تعلم القرآن لكل مسلم حول العالم، بغض النظر عن عمره أو موقعه.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <img
                src="/placeholder.svg?text=مصحف وقلم&height=400&width=600"
                alt="Quran Learning"
                className="rounded-lg shadow-lg w-full h-auto"
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
                <p className="text-muted-foreground leading-relaxed">
                  توفير تعليم قرآني عالي الجودة عبر الإنترنت، يجمع بين الدقة في التلقين والمرونة في الجدولة، مع التركيز على بناء علاقة روحية قوية بين الطالب والقرآن.
                </p>
              </motion.div>
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-3">
                  <Eye className="w-8 h-8 text-primary" />
                   رؤيتنا
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون الأكاديمية الرائدة عالميًا في تعليم القرآن الكريم عن بعد، ونصل بنور القرآن إلى كل بيت، ونخرّج أجيالاً حافظة وفاهمة لكتاب الله.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-20 bg-muted/30 dark:bg-gray-900/40">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">قيمنا الأساسية</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              قيمنا هي البوصلة التي توجه عملنا وتضمن تقديم أفضل تجربة لطلابنا.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn}>
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>الإخلاص</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    نستشعر عظمة خدمة كتاب الله ونسعى لرضاه في كل ما نقدمه.
                  </p>
                </CardContent>
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
                <CardContent>
                  <p className="text-muted-foreground">
                    نلتزم بأعلى معايير الجودة في التعليم ونختار أفضل المعلمين المهرة.
                  </p>
                </CardContent>
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
                <CardContent>
                  <p className="text-muted-foreground">
                    نوفر بيئة تعليمية مرنة تتكيف مع احتياجات وظروف كل طالب.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
