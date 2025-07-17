
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Play, FileText, TrendingUp, Award, Bell } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('schedule');

  // Mock data
  const studentInfo = {
    name: 'أحمد محمد',
    course: 'دورة جزء عم',
    level: 'أساسي',
    progress: 65,
    completedLessons: 13,
    totalLessons: 20
  };

  const schedule = [
    {
      day: 'الأحد',
      time: '16:00 - 17:00',
      subject: 'حفظ سورة النبأ',
      teacher: 'الأستاذ محمد الأحمد',
      status: 'upcoming'
    },
    {
      day: 'الثلاثاء',
      time: '16:00 - 17:00',
      subject: 'مراجعة سورة النازعات',
      teacher: 'الأستاذ محمد الأحمد',
      status: 'upcoming'
    },
    {
      day: 'الخميس',
      time: '16:00 - 17:00',
      subject: 'تجويد وتطبيق',
      teacher: 'الأستاذ محمد الأحمد',
      status: 'upcoming'
    }
  ];

  const lectures = [
    {
      title: 'مقدمة في التجويد',
      duration: '25 دقيقة',
      completed: true,
      date: '2024-01-15'
    },
    {
      title: 'أحكام النون الساكنة',
      duration: '30 دقيقة',
      completed: true,
      date: '2024-01-17'
    },
    {
      title: 'أحكام الميم الساكنة',
      duration: '28 دقيقة',
      completed: false,
      date: '2024-01-20'
    },
    {
      title: 'المدود وأنواعها',
      duration: '35 دقيقة',
      completed: false,
      date: '2024-01-22'
    }
  ];

  const monthlyReport = {
    attendance: 95,
    memorization: 85,
    recitation: 80,
    improvement: '+15%'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Islamic student dashboard background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-22 h-22 opacity-6">
          <img 
            src="https://images.pexels.com/photos/6032877/pexels-photo-6032877.jpeg?auto=compress&cs=tinysrgb&w=300" 
            alt="Student Quran" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute bottom-32 left-16 w-18 h-18 opacity-6">
          <img 
            src="https://images.pexels.com/photos/6032877/pexels-photo-6032877.jpeg?auto=compress&cs=tinysrgb&w=300" 
            alt="Islamic study materials" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">مرحباً، {studentInfo.name}</h1>
          <p className="text-muted-foreground">
            {studentInfo.course} - المستوى {studentInfo.level}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <Bell className="w-4 h-4" />
            التنبيهات
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">التقدم العام</p>
                <p className="text-2xl font-bold">{studentInfo.progress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <Progress value={studentInfo.progress} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الدروس المكتملة</p>
                <p className="text-2xl font-bold">{studentInfo.completedLessons}/{studentInfo.totalLessons}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">نسبة الحضور</p>
                <p className="text-2xl font-bold">{monthlyReport.attendance}%</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">التحسن الشهري</p>
                <p className="text-2xl font-bold text-green-600">{monthlyReport.improvement}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">جدولي</TabsTrigger>
          <TabsTrigger value="lectures">محاضراتي</TabsTrigger>
          <TabsTrigger value="report">تقريري</TabsTrigger>
        </TabsList>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                جدول الحصص الأسبوعي
              </CardTitle>
              <CardDescription>
                مواعيد حصصك القادمة هذا الأسبوع
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-semibold text-primary">{session.day}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.time}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{session.subject}</h3>
                        <p className="text-sm text-muted-foreground">{session.teacher}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-600">
                      قادم
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lectures Tab */}
        <TabsContent value="lectures" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                المحاضرات المسجلة
              </CardTitle>
              <CardDescription>
                قائمة بجميع المحاضرات والدروس المتاحة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lectures.map((lecture, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        lecture.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <Play className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-medium">{lecture.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {lecture.duration} • {lecture.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {lecture.completed && (
                        <Badge variant="outline" className="bg-green-50 text-green-600">
                          مكتمل
                        </Badge>
                      )}
                      <Button size="sm" variant={lecture.completed ? "outline" : "default"}>
                        {lecture.completed ? 'إعادة المشاهدة' : 'مشاهدة'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Tab */}
        <TabsContent value="report" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>تقرير الأداء الشهري</CardTitle>
                <CardDescription>تقييم شامل لأدائك هذا الشهر</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">الحضور</span>
                    <span className="text-sm font-medium">{monthlyReport.attendance}%</span>
                  </div>
                  <Progress value={monthlyReport.attendance} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">الحفظ</span>
                    <span className="text-sm font-medium">{monthlyReport.memorization}%</span>
                  </div>
                  <Progress value={monthlyReport.memorization} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">التلاوة</span>
                    <span className="text-sm font-medium">{monthlyReport.recitation}%</span>
                  </div>
                  <Progress value={monthlyReport.recitation} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ملاحظات المعلم</CardTitle>
                <CardDescription>تقييم وتوجيهات من معلمك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">نقاط القوة</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• تحسن ملحوظ في مخارج الحروف</li>
                      <li>• التزام ممتاز بمواعيد الحصص</li>
                      <li>• تطبيق جيد لأحكام التجويد</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">نصائح للتحسين</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• التركيز أكثر على المدود</li>
                      <li>• المراجعة اليومية للحفظ</li>
                      <li>• الاستماع للقراء المجودين</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
