
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  ChevronRight, 
  Award, 
  Heart, 
  CheckCircle,
  User,
  Calendar,
  Play,
  Plus,
  Minus
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
  const [openFaq, setOpenFaq] = useState<string | undefined>();

  // Features data
  const features = [
    {
      icon: Award,
      title: 'معلمون مجازون ومهرة',
      description: 'نخبة من المعلمين والمعلمات الحاصلين على إجازات في القراءات والتجويد'
    },
    {
      icon: Heart,
      title: 'منهجية مخصصة لكل طالب',
      description: 'برامج مصممة خصيصاً حسب مستوى وقدرات كل طالب على حدة'
    },
    {
      icon: Clock,
      title: 'مرونة في المواعيد تناسبك أينما كنت',
      description: 'حصص متاحة على مدار اليوم لتناسب جدولك الزمني'
    }
  ];

  // How it works steps
  const steps = [
    {
      step: '1',
      title: 'سجل واختر باقتك',
      description: 'اختر الباقة المناسبة لك وسجل في دقائق معدودة'
    },
    {
      step: '2',
      title: 'احجز جلستك الأولى',
      description: 'حدد الوقت المناسب لك مع المعلم المختص'
    },
    {
      step: '3',
      title: 'ابدأ رحلتك القرآنية',
      description: 'ابدأ التعلم والحفظ مع أفضل المعلمين'
    }
  ];

  // Teachers data
  const teachers = [
    {
      name: 'الشيخ أحمد العلوي',
      description: 'مجاز في القراءات العشرة وخبرة 15 سنة في التعليم عن بعد',
      specialization: 'تحفيظ وتجويد للرجال والأطفال'
    },
    {
      name: 'الأستاذة فاطمة النوري',
      description: 'مجازة في القراءات العشرة وخبرة 12 سنة في تعليم النساء والفتيات',
      specialization: 'تحفيظ وتجويد للنساء والفتيات'
    }
  ];

  // Subscription packages
  const packages = [
    {
      name: 'باقة البركة',
      sessions: '8 حصص شهرياً',
      price: '299 ريال',
      features: ['حصتان أسبوعياً', 'متابعة شخصية', 'تقارير شهرية'],
      popular: false
    },
    {
      name: 'باقة الإتقان',
      sessions: '12 حصة شهرياً',
      price: '399 ريال',
      features: ['3 حصص أسبوعياً', 'متابعة مكثفة', 'تقارير أسبوعية', 'مراجعات إضافية'],
      popular: true
    },
    {
      name: 'باقة الهمة',
      sessions: '16 حصة شهرياً',
      price: '499 ريال',
      features: ['4 حصص أسبوعياً', 'متابعة يومية', 'تقارير مفصلة', 'حصص مراجعة إضافية'],
      popular: false
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'أم عبدالله',
      country: 'السعودية',
      text: 'ابني أحب حفظ القرآن بعد انضمامه للأكاديمية. المعلمون صبورون ومتفهمون.',
      rating: 5
    },
    {
      name: 'أبو محمد',
      country: 'الإمارات',
      text: 'أكاديمية متميزة بأسلوب تعليم رائع. ابنتي تقدمت كثيراً في الحفظ والتجويد.',
      rating: 5
    },
    {
      name: 'أم سارة',
      country: 'مصر',
      text: 'الحصص منظمة والمتابعة ممتازة. أنصح كل أم تريد تعليم أطفالها القرآن.',
      rating: 5
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'هل المعلمون مجازون؟',
      answer: 'نعم، جميع معلمينا حاصلون على إجازات معتمدة في القراءات والتجويد من علماء متخصصين.'
    },
    {
      question: 'هل الحلقات فردية؟',
      answer: 'نعم، جميع حلقاتنا فردية لضمان الاهتمام الكامل بكل طالب وتخصيص المنهج حسب مستواه.'
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل الدفع عبر فيزا، ماستركارد، مدى، والتحويل البنكي. كما نوفر خصومات للدفع المسبق.'
    },
    {
      question: 'هل يمكنني تغيير مواعيد الحصص؟',
      answer: 'نعم، يمكنك إعادة جدولة حصصك قبل 24 ساعة من الموعد المحدد دون أي رسوم إضافية.'
    },
    {
      question: 'كم مدة الحصة الواحدة؟',
      answer: 'مدة الحصة الواحدة 45 دقيقة، موزعة بين التلاوة والحفظ والمراجعة حسب مستوى الطالب.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Islamic decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 opacity-5">
            <img 
              src="https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Islamic pattern" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-20 left-10 w-24 h-24 opacity-5">
            <img 
              src="https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Islamic pattern" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">أنِر قلبك بنور القرآن:</span>
                <br />
                <span className="text-foreground">رحلتك لحفظ كتاب الله تبدأ من هنا</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                نقدم حلقات قرآنية فردية عبر الإنترنت مع نخبة من المعلمين والمعلمات المتخصصين لجميع الأعمار والمستويات
              </p>
            </div>
            
            <div className="pt-4">
              <Button size="lg" className="text-lg px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link to="/register">
                  احجز جلستك التجريبية المجانية
                  <ChevronRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Decorative Islamic pattern */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 text-center border border-primary/20">
              {/* Islamic geometric pattern background */}
              <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Islamic geometric pattern" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="max-w-3xl mx-auto">
                <div className="text-3xl md:text-4xl text-primary font-bold mb-4 leading-relaxed">
                  ﴿ وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ ﴾
                </div>
                <p className="text-muted-foreground text-lg">
                  صدق الله العظيم - سورة القمر
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
       {/* Islamic calligraphy background */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
         <img 
           src="https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=1200" 
           alt="Islamic calligraphy" 
           className="w-full h-full object-cover"
         />
       </div>
       
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">لماذا تختار أكاديمية نور الهدى؟</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نجمع بين الأصالة والحداثة لنقدم لك تجربة تعليمية فريدة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="space-y-4 pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-lg">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">رحلتك معنا في 3 خطوات بسيطة</h2>
            <p className="text-xl text-muted-foreground">
              عملية سهلة وواضحة للبدء في رحلتك القرآنية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-8 transform -translate-x-4">
                    <ChevronRight className="w-6 h-6 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-20 bg-background">
        {/* Mosque silhouette background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 opacity-10">
            <img 
              src="https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Mosque silhouette" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">تعرّف على معلميك المهرة</h2>
            <p className="text-xl text-muted-foreground">
              نخبة مختارة من أفضل المعلمين المجازين
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teachers.map((teacher, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-xl">{teacher.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    {teacher.description}
                  </p>
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {teacher.specialization}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Packages Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">اختر الباقة التي تناسبك</h2>
            <p className="text-xl text-muted-foreground">
              باقات مرنة تناسب جميع الاحتياجات والميزانيات
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${pkg.popular ? 'border-primary scale-105 shadow-lg' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                      الأكثر شيوعاً
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                    <div className="text-muted-foreground">{pkg.sessions}</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={pkg.popular ? 'default' : 'outline'}
                    size="lg"
                    asChild
                  >
                    <Link to="/register">
                      اشترك الآن
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">ماذا قال طلابنا عنا؟</h2>
            <p className="text-xl text-muted-foreground">
              شهادات حقيقية من طلابنا وأولياء الأمور
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground leading-relaxed text-center">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-center pt-4 border-t">
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.country}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">الأسئلة الشائعة</h2>
            <p className="text-xl text-muted-foreground">
              إجابات على أهم الأسئلة التي قد تخطر ببالك
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible value={openFaq} onValueChange={setOpenFaq}>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg mb-4 px-6">
                  <AccordionTrigger className="hover:no-underline py-6 text-right">
                    <span className="text-lg font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        {/* Islamic star pattern overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="Islamic star pattern" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              هل أنت مستعد لتبدأ رحلتك مع القرآن؟
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              انضم إلى آلاف الطلاب الذين غيّروا حياتهم من خلال حفظ كتاب الله الكريم
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/register">
                نعم، أريد جلستي التجريبية المجانية
                <ChevronRight className="mr-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
