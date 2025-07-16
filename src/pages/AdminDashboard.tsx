
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  Upload, 
  Bell, 
  FileText, 
  Settings, 
  TrendingUp,
  Calendar,
  DollarSign,
  UserPlus
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalStudents: 1250,
    activeCourses: 8,
    monthlyRevenue: 15600,
    pendingRequests: 23
  };

  const recentStudents = [
    { name: 'أحمد محمد', course: 'القاعدة النورانية', status: 'نشط', joinDate: '2024-01-15' },
    { name: 'فاطمة علي', course: 'جزء عم', status: 'نشط', joinDate: '2024-01-14' },
    { name: 'محمد الأحمد', course: 'تجويد متقدم', status: 'معلق', joinDate: '2024-01-13' },
    { name: 'عائشة سالم', course: 'القاعدة النورانية', status: 'نشط', joinDate: '2024-01-12' }
  ];

  const courses = [
    { name: 'القاعدة النورانية', students: 450, revenue: 0, status: 'مجاني' },
    { name: 'دورة جزء عم', students: 380, revenue: 11400, status: 'مدفوع' },
    { name: 'تجويد متقدم', students: 220, revenue: 9900, status: 'مدفوع' },
    { name: 'حفظ متقدم', students: 150, revenue: 7500, status: 'مدفوع' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">لوحة التحكم الإدارية</h1>
          <p className="text-muted-foreground">
            إدارة شاملة لأكاديمية نور الهُدى
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button variant="outline" className="gap-2">
            <Bell className="w-4 h-4" />
            التنبيهات ({stats.pendingRequests})
          </Button>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            إضافة طالب جديد
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الطلاب</p>
                <p className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الدورات النشطة</p>
                <p className="text-2xl font-bold">{stats.activeCourses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الإيرادات الشهرية</p>
                <p className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">طلبات معلقة</p>
                <p className="text-2xl font-bold">{stats.pendingRequests}</p>
              </div>
              <FileText className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="students">إدارة الطلاب</TabsTrigger>
          <TabsTrigger value="courses">إدارة الدورات</TabsTrigger>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="notifications">التنبيهات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الطلاب الجدد</CardTitle>
                <CardDescription>آخر الطلاب المسجلين في الأكاديمية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.course}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={student.status === 'نشط' ? 'default' : 'secondary'}>
                          {student.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{student.joinDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء الدورات</CardTitle>
                <CardDescription>إحصائيات الدورات والإيرادات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{course.name}</h4>
                        <p className="text-sm text-muted-foreground">{course.students} طالب</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${course.revenue.toLocaleString()}</p>
                        <Badge variant={course.status === 'مجاني' ? 'secondary' : 'default'}>
                          {course.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Students Management Tab */}
        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    قائمة الطلاب
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-6">
                    <Input 
                      placeholder="البحث عن طالب..." 
                      className="max-w-sm"
                    />
                    <Button>إضافة طالب جديد</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentStudents.map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-primary">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.course}</p>
                            <p className="text-xs text-muted-foreground">تاريخ التسجيل: {student.joinDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={student.status === 'نشط' ? 'default' : 'secondary'}>
                            {student.status}
                          </Badge>
                          <Button size="sm" variant="outline">تعديل</Button>
                          <Button size="sm" variant="outline">عرض التفاصيل</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assign Students to Teachers */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>تخصيص الطلاب للمعلمين</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">اختر الطالب</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>أحمد محمد</option>
                      <option>فاطمة علي</option>
                      <option>محمد الأحمد</option>
                      <option>عائشة سالم</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">اختر المعلم</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>الأستاذ محمد الأحمد</option>
                      <option>الأستاذة فاطمة سالم</option>
                      <option>الأستاذ علي محمد</option>
                      <option>الأستاذة عائشة علي</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">الدورة</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>القاعدة النورانية</option>
                      <option>جزء عم</option>
                      <option>تجويد متقدم</option>
                      <option>حفظ متقدم</option>
                    </select>
                  </div>
                  
                  <Button className="w-full">تخصيص الطالب</Button>
                </CardContent>
              </Card>

              {/* Pending Requests */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    طلبات الانضمام
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'سعد الأحمد', course: 'القاعدة النورانية', date: '2024-01-20' },
                      { name: 'مريم سالم', course: 'جزء عم', date: '2024-01-19' },
                      { name: 'عبدالله محمد', course: 'تجويد متقدم', date: '2024-01-18' }
                    ].map((request, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-sm">{request.name}</h5>
                          <span className="text-xs text-muted-foreground">{request.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{request.course}</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">قبول</Button>
                          <Button size="sm" variant="outline" className="flex-1">رفض</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Courses Management Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Existing Courses */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    الدورات الحالية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold">{course.name}</h4>
                            <Badge variant={course.status === 'مجاني' ? 'secondary' : 'default'}>
                              {course.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground mb-3">
                            <p>عدد الطلاب: {course.students}</p>
                            <p>الإيرادات: ${course.revenue.toLocaleString()}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">تعديل</Button>
                            <Button size="sm" variant="outline">عرض</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add New Course */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>إضافة دورة جديدة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">اسم الدورة</label>
                    <Input placeholder="مثال: أحكام التلاوة" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">الوصف</label>
                    <textarea 
                      className="w-full p-2 border rounded-md text-sm min-h-[80px]" 
                      placeholder="وصف مختصر عن الدورة..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">المدة (بالأسابيع)</label>
                    <Input type="number" placeholder="8" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">السعر ($)</label>
                    <Input type="number" placeholder="50" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">المستوى</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>مبتدئ</option>
                      <option>متوسط</option>
                      <option>متقدم</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">المعلم المسؤول</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>الأستاذ محمد الأحمد</option>
                      <option>الأستاذة فاطمة سالم</option>
                      <option>الأستاذ علي محمد</option>
                    </select>
                  </div>
                  
                  <Button className="w-full">إنشاء الدورة</Button>
                </CardContent>
              </Card>

              {/* Course Categories */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>تصنيفات الدورات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'التجويد', courses: 3, color: 'bg-blue-100 text-blue-800' },
                      { name: 'الحفظ', courses: 2, color: 'bg-green-100 text-green-800' },
                      { name: 'القراءات', courses: 1, color: 'bg-purple-100 text-purple-800' }
                    ].map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${category.color}`}>
                            {category.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {category.courses} دورات
                          </span>
                        </div>
                        <Button size="sm" variant="ghost">تعديل</Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-3">إضافة تصنيف</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                إدارة المحتوى
              </CardTitle>
              <CardDescription>
                رفع وإدارة المحاضرات والمواد التعليمية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">رفع محاضرة جديدة</h3>
                <p className="text-muted-foreground mb-4">
                  اسحب الملفات هنا أو اضغط للاختيار
                </p>
                <Button>اختيار الملفات</Button>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">المحاضرات الحديثة</h4>
                <div className="space-y-3">
                  {[
                    { title: 'مقدمة في التجويد', date: '2024-01-20', size: '45 MB' },
                    { title: 'أحكام النون الساكنة', date: '2024-01-18', size: '52 MB' },
                    { title: 'المدود وأنواعها', date: '2024-01-15', size: '38 MB' }
                  ].map((lecture, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h5 className="font-medium">{lecture.title}</h5>
                        <p className="text-sm text-muted-foreground">{lecture.date} • {lecture.size}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">تعديل</Button>
                        <Button size="sm" variant="destructive">حذف</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إرسال التنبيهات
              </CardTitle>
              <CardDescription>
                إرسال إشعارات للطلاب وأولياء الأمور
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">نوع التنبيه</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>تذكير بالحصة</option>
                    <option>إعلان عام</option>
                    <option>تقرير الأداء</option>
                    <option>دعوة لحدث</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">المستقبلون</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>جميع الطلاب</option>
                    <option>طلاب دورة معينة</option>
                    <option>أولياء الأمور</option>
                    <option>مخصص</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان التنبيه</label>
                  <Input placeholder="أدخل عنوان التنبيه" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">نص التنبيه</label>
                  <textarea 
                    className="w-full p-3 border rounded-md min-h-[100px]" 
                    placeholder="اكتب رسالة التنبيه هنا..."
                  />
                </div>
                
                <Button className="w-full">إرسال التنبيه</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  إعدادات النظام
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">اسم الأكاديمية</label>
                  <Input defaultValue="أكاديمية نور الهُدى" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                  <Input defaultValue="info@nooralhudalacademy.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                  <Input defaultValue="+966 50 123 4567" />
                </div>
                <Button>حفظ التغييرات</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات الاشتراك والدفع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">طرق الدفع المقبولة</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>بطاقة ائتمانية</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      <span>حوالة بنكية</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>PayPal</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">عملة التسعير</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>الدولار الأمريكي (USD)</option>
                    <option>الريال السعودي (SAR)</option>
                    <option>الدرهم الإماراتي (AED)</option>
                  </select>
                </div>
                <Button>حفظ الإعدادات</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
