
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Users, Star, ChevronRight } from 'lucide-react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'القاعدة النورانية',
      description: 'تعلم أساسيات القراءة الصحيحة للقرآن الكريم من خلال القاعدة النورانية المبسطة',
      duration: '4 أسابيع',
      price: 'مجاني',
      level: 'مبتدئ',
      students: 2450,
      rating: 4.9,
      features: [
        'تعلم الحروف العربية ومخارجها',
        'قواعد التجويد الأساسية',
        'التدريب على النطق الصحيح',
        'متابعة شخصية من المعلم'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 2,
      title: 'دورة جزء عم',
      description: 'احفظ جزء عم كاملاً مع فهم المعاني وتطبيق أحكام التجويد بشكل صحيح',
      duration: '8 أسابيع',
      price: '$30',
      level: 'أساسي',
      students: 1850,
      rating: 4.8,
      features: [
        'حفظ 37 سورة من جزء عم',
        'فهم معاني السور',
        'تطبيق أحكام التجويد',
        'مراجعة أسبوعية'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      title: 'دورة تجويد متقدمة',
      description: 'تعمق في علم التجويد وتعلم الأحكام المتقدمة للقراءة الصحيحة للقرآن الكريم',
      duration: '12 أسبوع',
      price: '$45',
      level: 'متقدم',
      students: 980,
      rating: 4.9,
      features: [
        'أحكام التجويد المتقدمة',
        'القراءات العشر',
        'الوقف والابتداء',
        'شهادة معتمدة'
      ],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدئ': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'أساسي': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'متقدم': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          دوراتنا التعليمية
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          اختر الدورة المناسبة لمستواك وابدأ رحلتك في تعلم وحفظ القرآن الكريم
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card key={course.id} className="h-full flex flex-col hover:shadow-xl transition-all duration-300 group">
            {/* Course Header with Gradient */}
            <div className={`bg-gradient-to-r ${course.color} p-6 text-white rounded-t-lg`}>
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className={getLevelColor(course.level)}>
                  {course.level}
                </Badge>
                <div className="text-right">
                  <div className="text-2xl font-bold">{course.price}</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
              <p className="opacity-90 leading-relaxed">{course.description}</p>
            </div>

            <CardContent className="flex-1 p-6">
              {/* Course Stats */}
              <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()} طالب</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Course Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg mb-3">ما ستتعلمه:</h4>
                <ul className="space-y-2">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Button className="w-full group-hover:bg-primary/90 transition-colors" asChild>
                <Link to="/register">
                  التسجيل في الدورة
                  <ChevronRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
