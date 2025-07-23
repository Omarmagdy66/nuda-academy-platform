import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
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
  UserPlus,
  Edit,
  Eye,
  Trash2,
  Plus,
  Save,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  // States for forms and data
  const [newStudent, setNewStudent] = useState({
    name: '',
    course: '',
    teacher: ''
  });

  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    level: '',
    teacher: ''
  });

  const [notification, setNotification] = useState({
    type: '',
    recipients: '',
    title: '',
    message: ''
  });

  const [settings, setSettings] = useState({
    academyName: 'أكاديمية نور الهُدى',
    email: 'info@nooralhudalacademy.com',
    phone: '+966 50 123 4567',
    whatsapp: '+966501234567'
  });

  const [editingStudent, setEditingStudent] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  // Mock data
  const stats = {
    totalStudents: 1250,
    activeCourses: 8,
    monthlyRevenue: 15600,
    pendingRequests: 23
  };

  const [students, setStudents] = useState([
    { id: 1, name: 'أحمد محمد', course: 'القاعدة النورانية', status: 'نشط', joinDate: '2024-01-15', teacher: 'الأستاذ محمد الأحمد' },
    { id: 2, name: 'فاطمة علي', course: 'جزء عم', status: 'نشط', joinDate: '2024-01-14', teacher: 'الأستاذة فاطمة سالم' },
    { id: 3, name: 'محمد الأحمد', course: 'تجويد متقدم', status: 'معلق', joinDate: '2024-01-13', teacher: 'الأستاذ علي محمد' },
    { id: 4, name: 'عائشة سالم', course: 'القاعدة النورانية', status: 'نشط', joinDate: '2024-01-12', teacher: 'الأستاذة عائشة علي' }
  ]);

  const [courses, setCourses] = useState([
    { id: 1, name: 'القاعدة النورانية', students: 450, revenue: 0, status: 'مجاني', description: 'تعلم أساسيات القراءة', duration: '4', level: 'مبتدئ', teacher: 'الأستاذ محمد الأحمد' },
    { id: 2, name: 'دورة جزء عم', students: 380, revenue: 11400, status: 'مدفوع', description: 'حفظ جزء عم كاملاً', duration: '8', level: 'أساسي', teacher: 'الأستاذة فاطمة سالم' },
    { id: 3, name: 'تجويد متقدم', students: 220, revenue: 9900, status: 'مدفوع', description: 'تعلم أحكام التجويد المتقدمة', duration: '12', level: 'متقدم', teacher: 'الأستاذ علي محمد' },
    { id: 4, name: 'حفظ متقدم', students: 150, revenue: 7500, status: 'مدفوع', description: 'حفظ أجزاء متقدمة من القرآن', duration: '16', level: 'متقدم', teacher: 'الأستاذة عائشة علي' }
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, name: 'سعد الأحمد', course: 'القاعدة النورانية', date: '2024-01-20' },
    { id: 2, name: 'مريم سالم', course: 'جزء عم', date: '2024-01-19' },
    { id: 3, name: 'عبدالله محمد', course: 'تجويد متقدم', date: '2024-01-18' }
  ]);

  const [lectures, setLectures] = useState([
    { id: 1, title: 'مقدمة في التجويد', date: '2024-01-20', size: '45 MB' },
    { id: 2, title: 'أحكام النون الساكنة', date: '2024-01-18', size: '52 MB' },
    { id: 3, title: 'المدود وأنواعها', date: '2024-01-15', size: '38 MB' }
  ]);

  // Handler functions
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.course || !newStudent.teacher) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const student = {
      id: students.length + 1,
      name: newStudent.name,
      course: newStudent.course,
      teacher: newStudent.teacher,
      status: 'نشط',
      joinDate: new Date().toISOString().split('T')[0]
    };

    setStudents([...students, student]);
    setNewStudent({ name: '', course: '', teacher: '' });
    
    toast({
      title: "تم بنجاح",
      description: "تم إضافة الطالب الجديد"
    });
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleSaveStudent = () => {
    setStudents(students.map(s => 
      s.id === editingStudent.id ? editingStudent : s
    ));
    setEditingStudent(null);
    
    toast({
      title: "تم بنجاح",
      description: "تم تحديث بيانات الطالب"
    });
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter(s => s.id !== studentId));
    
    toast({
      title: "تم بنجاح",
      description: "تم حذف الطالب"
    });
  };

  const handleViewStudent = (student) => {
    toast({
      title: "تفاصيل الطالب",
      description: `الاسم: ${student.name}\nالدورة: ${student.course}\nالمعلم: ${student.teacher}\nالحالة: ${student.status}`
    });
  };

  const handleAssignStudent = () => {
    toast({
      title: "تم بنجاح",
      description: "تم تخصيص الطالب للمعلم"
    });
  };

  const handleAcceptRequest = (requestId) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      const newStudent = {
        id: students.length + 1,
        name: request.name,
        course: request.course,
        status: 'نشط',
        joinDate: request.date,
        teacher: 'الأستاذ محمد الأحمد'
      };
      
      setStudents([...students, newStudent]);
      setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
      
      toast({
        title: "تم بنجاح",
        description: "تم قبول طلب الانضمام"
      });
    }
  };

  const handleRejectRequest = (requestId) => {
    setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
    
    toast({
      title: "تم بنجاح",
      description: "تم رفض طلب الانضمام"
    });
  };

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.description || !newCourse.duration || !newCourse.level || !newCourse.teacher) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const course = {
      id: courses.length + 1,
      name: newCourse.name,
      description: newCourse.description,
      duration: newCourse.duration,
      price: newCourse.price || '0',
      level: newCourse.level,
      teacher: newCourse.teacher,
      students: 0,
      revenue: 0,
      status: newCourse.price ? 'مدفوع' : 'مجاني'
    };

    setCourses([...courses, course]);
    setNewCourse({ name: '', description: '', duration: '', price: '', level: '', teacher: '' });
    
    toast({
      title: "تم بنجاح",
      description: "تم إنشاء الدورة الجديدة"
    });
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
  };

  const handleSaveCourse = () => {
    setCourses(courses.map(c => 
      c.id === editingCourse.id ? editingCourse : c
    ));
    setEditingCourse(null);
    
    toast({
      title: "تم بنجاح",
      description: "تم تحديث بيانات الدورة"
    });
  };

  const handleViewCourse = (course) => {
    toast({
      title: "تفاصيل الدورة",
      description: `الاسم: ${course.name}\nالوصف: ${course.description}\nالمدة: ${course.duration} أسابيع\nالمستوى: ${course.level}`
    });
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(c => c.id !== courseId));
    
    toast({
      title: "تم بنجاح",
      description: "تم حذف الدورة"
    });
  };

  const handleUploadFile = () => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*,audio/*,application/pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newLecture = {
          id: lectures.length + 1,
          title: file.name.split('.')[0],
          date: new Date().toISOString().split('T')[0],
          size: `${Math.round(file.size / 1024 / 1024)} MB`
        };
        
        setLectures([...lectures, newLecture]);
        
        toast({
          title: "تم بنجاح",
          description: "تم رفع المحاضرة بنجاح"
        });
      }
    };
    input.click();
  };

  const handleEditLecture = (lectureId) => {
    const lecture = lectures.find(l => l.id === lectureId);
    const newTitle = prompt('أدخل العنوان الجديد:', lecture.title);
    if (newTitle) {
      setLectures(lectures.map(l => 
        l.id === lectureId ? { ...l, title: newTitle } : l
      ));
      
      toast({
        title: "تم بنجاح",
        description: "تم تحديث عنوان المحاضرة"
      });
    }
  };

  const handleDeleteLecture = (lectureId) => {
    setLectures(lectures.filter(l => l.id !== lectureId));
    
    toast({
      title: "تم بنجاح",
      description: "تم حذف المحاضرة"
    });
  };

  const handleSendNotification = () => {
    if (!notification.type || !notification.recipients || !notification.title || !notification.message) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending notification
    setTimeout(() => {
      toast({
        title: "تم بنجاح",
        description: "تم إرسال التنبيه بنجاح"
      });
      
      setNotification({ type: '', recipients: '', title: '', message: '' });
    }, 1000);
  };

  const handleSaveSettings = () => {
    toast({
      title: "تم بنجاح",
      description: "تم حفظ الإعدادات بنجاح"
    });
  };

  const handleAddCategory = () => {
    const categoryName = prompt('أدخل اسم التصنيف الجديد:');
    if (categoryName) {
      toast({
        title: "تم بنجاح",
        description: `تم إضافة تصنيف "${categoryName}"`
      });
    }
  };

  const handleEditCategory = (categoryName) => {
    const newName = prompt('أدخل الاسم الجديد:', categoryName);
    if (newName) {
      toast({
        title: "تم بنجاح",
        description: `تم تحديث التصنيف إلى "${newName}"`
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Islamic administrative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-20 h-20 opacity-5">
          <img 
            src="https://images.pexels.com/photos/6032877/pexels-photo-6032877.jpeg?auto=compress&cs=tinysrgb&w=300" 
            alt="Islamic manuscript" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute bottom-40 left-16 w-18 h-18 opacity-5">
          <img 
            src="https://images.pexels.com/photos/6032877/pexels-photo-6032877.jpeg?auto=compress&cs=tinysrgb&w=300" 
            alt="Islamic geometric design" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">لوحة التحكم الإدارية</h1>
          <p className="text-muted-foreground">
            إدارة شاملة لأكاديمية نور الهُدى
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setActiveTab('notifications')}>
            <Bell className="w-4 h-4" />
            التنبيهات ({stats.pendingRequests})
          </Button>
          <Button className="gap-2" onClick={() => setActiveTab('students')}>
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
                  {students.slice(0, 4).map((student) => (
                    <div key={student.id} className="flex items-center justify-between">
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
                  {courses.slice(0, 4).map((course) => (
                    <div key={course.id} className="flex items-center justify-between">
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
                    <Button onClick={handleAddStudent}>إضافة طالب جديد</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-primary">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            {editingStudent?.id === student.id ? (
                              <div className="space-y-2">
                                <Input 
                                  value={editingStudent.name}
                                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                                  className="w-48"
                                />
                                <Select 
                                  value={editingStudent.course}
                                  onValueChange={(value) => setEditingStudent({...editingStudent, course: value})}
                                >
                                  <SelectTrigger className="w-48">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="القاعدة النورانية">القاعدة النورانية</SelectItem>
                                    <SelectItem value="جزء عم">جزء عم</SelectItem>
                                    <SelectItem value="تجويد متقدم">تجويد متقدم</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            ) : (
                              <>
                                <h4 className="font-medium">{student.name}</h4>
                                <p className="text-sm text-muted-foreground">{student.course}</p>
                                <p className="text-xs text-muted-foreground">تاريخ التسجيل: {student.joinDate}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={student.status === 'نشط' ? 'default' : 'secondary'}>
                            {student.status}
                          </Badge>
                          {editingStudent?.id === student.id ? (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={handleSaveStudent}>
                                <Save className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingStudent(null)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditStudent(student)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleViewStudent(student)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteStudent(student.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add Student Form & Pending Requests */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>إضافة طالب جديد</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>اسم الطالب</Label>
                    <Input 
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      placeholder="أدخل اسم الطالب"
                    />
                  </div>
                  
                  <div>
                    <Label>الدورة</Label>
                    <Select value={newStudent.course} onValueChange={(value) => setNewStudent({...newStudent, course: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدورة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="القاعدة النورانية">القاعدة النورانية</SelectItem>
                        <SelectItem value="جزء عم">جزء عم</SelectItem>
                        <SelectItem value="تجويد متقدم">تجويد متقدم</SelectItem>
                        <SelectItem value="حفظ متقدم">حفظ متقدم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>المعلم</Label>
                    <Select value={newStudent.teacher} onValueChange={(value) => setNewStudent({...newStudent, teacher: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المعلم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الأستاذ محمد الأحمد">الأستاذ محمد الأحمد</SelectItem>
                        <SelectItem value="الأستاذة فاطمة سالم">الأستاذة فاطمة سالم</SelectItem>
                        <SelectItem value="الأستاذ علي محمد">الأستاذ علي محمد</SelectItem>
                        <SelectItem value="الأستاذة عائشة علي">الأستاذة عائشة علي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full" onClick={handleAddStudent}>إضافة الطالب</Button>
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
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-sm">{request.name}</h5>
                          <span className="text-xs text-muted-foreground">{request.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{request.course}</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" onClick={() => handleAcceptRequest(request.id)}>قبول</Button>
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => handleRejectRequest(request.id)}>رفض</Button>
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
                    {courses.map((course) => (
                      <Card key={course.id}>
                        <CardContent className="p-4">
                          {editingCourse?.id === course.id ? (
                            <div className="space-y-3">
                              <Input 
                                value={editingCourse.name}
                                onChange={(e) => setEditingCourse({...editingCourse, name: e.target.value})}
                              />
                              <Textarea 
                                value={editingCourse.description}
                                onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                                rows={2}
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={handleSaveCourse}>
                                  <Save className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingCourse(null)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
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
                                <Button size="sm" variant="outline" onClick={() => handleEditCourse(course)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleViewCourse(course)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDeleteCourse(course.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </>
                          )}
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
                    <Label>اسم الدورة</Label>
                    <Input 
                      placeholder="مثال: أحكام التلاوة" 
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>الوصف</Label>
                    <Textarea 
                      placeholder="وصف مختصر عن الدورة..."
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <Label>المدة (بالأسابيع)</Label>
                    <Input 
                      type="number" 
                      placeholder="8" 
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>السعر ($)</Label>
                    <Input 
                      type="number" 
                      placeholder="50" 
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>المستوى</Label>
                    <Select value={newCourse.level} onValueChange={(value) => setNewCourse({...newCourse, level: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="مبتدئ">مبتدئ</SelectItem>
                        <SelectItem value="متوسط">متوسط</SelectItem>
                        <SelectItem value="متقدم">متقدم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>المعلم المسؤول</Label>
                    <Select value={newCourse.teacher} onValueChange={(value) => setNewCourse({...newCourse, teacher: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المعلم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الأستاذ محمد الأحمد">الأستاذ محمد الأحمد</SelectItem>
                        <SelectItem value="الأستاذة فاطمة سالم">الأستاذة فاطمة سالم</SelectItem>
                        <SelectItem value="الأستاذ علي محمد">الأستاذ علي محمد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full" onClick={handleAddCourse}>إنشاء الدورة</Button>
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
                        <Button size="sm" variant="ghost" onClick={() => handleEditCategory(category.name)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-3" onClick={handleAddCategory}>
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة تصنيف
                  </Button>
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
                <Button onClick={handleUploadFile}>اختيار الملفات</Button>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">المحاضرات الحديثة</h4>
                <div className="space-y-3">
                  {lectures.map((lecture) => (
                    <div key={lecture.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h5 className="font-medium">{lecture.title}</h5>
                        <p className="text-sm text-muted-foreground">{lecture.date} • {lecture.size}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditLecture(lecture.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteLecture(lecture.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
                  <Label>نوع التنبيه</Label>
                  <Select value={notification.type} onValueChange={(value) => setNotification({...notification, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع التنبيه" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reminder">تذكير بالحصة</SelectItem>
                      <SelectItem value="announcement">إعلان عام</SelectItem>
                      <SelectItem value="report">تقرير الأداء</SelectItem>
                      <SelectItem value="event">دعوة لحدث</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>المستقبلون</Label>
                  <Select value={notification.recipients} onValueChange={(value) => setNotification({...notification, recipients: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المستقبلين" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الطلاب</SelectItem>
                      <SelectItem value="course">طلاب دورة معينة</SelectItem>
                      <SelectItem value="parents">أولياء الأمور</SelectItem>
                      <SelectItem value="custom">مخصص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>عنوان التنبيه</Label>
                  <Input 
                    placeholder="أدخل عنوان التنبيه" 
                    value={notification.title}
                    onChange={(e) => setNotification({...notification, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>نص التنبيه</Label>
                  <Textarea 
                    placeholder="اكتب رسالة التنبيه هنا..."
                    value={notification.message}
                    onChange={(e) => setNotification({...notification, message: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button className="w-full" onClick={handleSendNotification}>إرسال التنبيه</Button>
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
                  <Label>اسم الأكاديمية</Label>
                  <Input 
                    value={settings.academyName}
                    onChange={(e) => setSettings({...settings, academyName: e.target.value})}
                  />
                </div>
                <div>
                  <Label>البريد الإلكتروني</Label>
                  <Input 
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label>رقم الهاتف</Label>
                  <Input 
                    value={settings.phone}
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label>رقم واتساب للتواصل</Label>
                  <Input 
                    placeholder="+966501234567" 
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    سيظهر زر واتساب عائم في جميع صفحات المستخدمين
                  </p>
                </div>
                <Button onClick={handleSaveSettings}>حفظ التغييرات</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات الاشتراك والدفع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>طرق الدفع المقبولة</Label>
                  <div className="space-y-2 mt-2">
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
                  <Label>عملة التسعير</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">الدولار الأمريكي (USD)</SelectItem>
                      <SelectItem value="SAR">الريال السعودي (SAR)</SelectItem>
                      <SelectItem value="AED">الدرهم الإماراتي (AED)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;