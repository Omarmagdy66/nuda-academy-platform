
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Clock, Star, ChevronRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'مناهج متدرجة',
      description: 'من القاعدة النورانية إلى الحفظ المتقدم'
    },
    {
      icon: Users,
      title: 'متابعة شخصية',
      description: 'تقييم شهري وتقارير أداء'
    },
    {
      icon: Clock,
      title: 'مرونة في المواعيد',
      description: 'حصص صباحية ومسائية تناسب الجميع'
    }
  ];

  const testimonials = [
    {
      name: 'أ. أحمد محمد',
      text: 'ابني تحسّن بشكل رائع في الحفظ والتجويد! المعلمون متميزون والمنهج واضح.',
      rating: 5
    },
    {
      name: 'أ. سارة علي',
      text: 'المعلمات متميزات والدروس ممتعة. ابنتي تحب حصص التحفيظ الآن.',
      rating: 5
    },
    {
      name: 'أ. محمد الأحمد',
      text: 'أكاديمية رائعة بمعايير عالية. أنصح بها كل من يريد تعلم القرآن الكريم.',
      rating: 5
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient leading-tight">
              ابدأ رحلتك مع القرآن الكريم
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              تعلم، احفظ، وارتقِ من أي مكان في العالم مع أفضل المعلمين المتخصصين في تحفيظ القرآن الكريم
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/register">
                ابدأ الآن
                <ChevronRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/courses">استعرض الدورات</Link>
            </Button>
          </div>
        </div>
        
        {/* Hero Image/Illustration Area */}
        <div className="mt-12 relative">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-16 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl md:text-8xl text-primary/20 font-bold mb-4">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <p className="text-muted-foreground">
                "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">لماذا أكاديمية نور الهُدى؟</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نقدم تجربة تعليمية متميزة تجمع بين الأصالة والحداثة
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
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
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">آراء أولياء الأمور</h2>
            <p className="text-xl text-muted-foreground">
              ماذا يقول أولياء الأمور عن تجربتهم معنا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="font-semibold text-primary">
                    {testimonial.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary to-secondary text-white">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              هل أنت مستعد لبدء رحلتك؟
            </h2>
            <p className="text-xl mb-8 opacity-90">
              انضم إلى آلاف الطلاب الذين بدأوا رحلتهم مع القرآن الكريم
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link to="/register">
                سجل الآن مجاناً
                <ChevronRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
