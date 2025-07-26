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
  Calendar, 
  Clock, 
  Star, 
  TrendingUp,
  FileText,
  Video,
  MessageSquare,
  Award,
  Bell,
  Edit,
  Eye,
  Plus,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  // Teacher info
  const teacherInfo = {
    name: 'الأستاذ محمد الأحمد',
    specialization: 'تحفيظ وتجويد القرآن الكريم',
    experience: '15 سنة',
    rating: 4.9,
    totalStudents: 45,
    activeCourses: 3
  };

  // States
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'أحمد محمد', 
      course: 'القاعدة النورانية', 
      progress: 75, 
      attendance: 95,
      lastSession: '2024-01-20',
      status: 'نشط',
      notes: 'طالب متميز، يحتاج لمراجعة المدود'
    },
    { 
      id: 2, 
      name: 'فاطمة علي', 
      course: 'جزء عم', 
      progress: 60, 
      attendance: 88,
      lastSession: '2024-01-19',
      status: 'نشط',
      notes: 'تحسن ملحوظ في التجويد'
    },
    { 
      id: 3, 
      name: 'عبدالله سالم', 
      course: 'تجويد متقدم', 
      progress: 40, 
      attendance: 70,
      lastSession: '2024-01-18',
      status: 'يحتاج متابعة',
      notes: 'غياب متكرر، يحتاج تشجيع'
    }
  ]);

  const [schedule, setSchedule] = useState([
    {
      id: 1,
      student: 'أحمد محمد',
      course: 'القاعدة النورانية',
      date: '2024-01-21',
      time: '16:00',
      duration: '45 دقيقة',
      status: 'مجدولة'
    },
    {
      id: 2,
      student: 'فاطمة علي',
      course: 'جزء عم',
      date: '2024-01-21',
      time: '17:00',
      duration: '45 دقيقة',
      status: 'مجدولة'
    },
    {
      id: 3,
      student: 'عبدالله سالم',
      course: 'تجويد متقدم',
      date: '2024-01-22',
      time: '16:00',
      duration: '45 دقيقة',
      status: 'مجدولة'
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: 1,
      student: 'أحمد محمد',
      date: '2024-01-20',
      memorization: 85,
      recitation: 90,
      tajweed: 80,
      notes: 'أداء ممتاز، يحتاج لمراجعة أحكام النون الساكنة'
    },
    {
      id: 2,
      student: 'فاطمة علي',
      date: '2024-01-19',
      memorization: 75,
      recitation: 85,
      tajweed: 70,
      notes: 'تحسن في الحفظ، تحتاج لتركيز أكثر على التجويد'
    }
  ]);

  const [editingStudent, setEditingStudent] = useState(null);
  const [newReport, setNewReport] = useState({
    student: '',
    memorization: '',
    recitation: '',
    tajweed: '',
    notes: ''
  });

  // Handler functions
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

  const handleViewStudent = (student) => {
    toast({
      title: "تفاصيل الطالب",
      description: `الاسم: ${student.name}
الدورة: ${student.course}
التقدم: ${student.progress}%
الحضور: ${student.attendance}%`
    });
  };

  const handleAddReport = () => {
    if (!newReport.student || !newReport.memorization || !newReport.recitation || !newReport.tajweed) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const report = {
      id: reports.length + 1,
      student: newReport.student,
      date: new Date().toISOString().split('T')[0],
      memorization: parseInt(newReport.memorization),
      recitation: parseInt(newReport.recitation),
      tajweed: parseInt(newReport.tajweed),
      notes: newReport.notes
    };

    setReports([report, ...reports]);
    setNewReport({ student: '', memorization: '', recitation: '', tajweed: '', notes: '' });
    
    toast({
      title: "تم بنجاح",
      description: "تم إضافة التقرير بنجاح"
    });
  };

  const handleCompleteSession = (sessionId) => {
    setSchedule(schedule.map(s => 
      s.id === sessionId ? { ...s, status: 'مكتملة' } : s
    ));
    
    toast({
      title: "تم بنجاح",
      description: "تم تسجيل الحصة كمكتملة"
    });
  };

  const handleCancelSession = (sessionId) => {
    setSchedule(schedule.map(s => 
      s.id === sessionId ? { ...s, status: 'ملغية' } : s
    ));
    
    toast({
      title: "تم بنجاح",
      description: "تم إلغاء الحصة"
    });
  };

  const handleRescheduleSession = (sessionId) => {
    toast({
      title: "إعادة جدولة",
      description: "سيتم فتح نافذة إعادة الجدولة قريباً"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'يحتاج متابعة': return 'bg-yellow-100 text-yellow-800';
      case 'معلق': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSessionStatusColor = (status) => {
    switch (status) {
      case 'مجدولة': return 'bg-blue-100 text-blue-800';
      case 'مكتملة': return 'bg-green-100 text-green-800';
      case 'ملغية': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">مرحباً، {teacherInfo.name}</h1>
          <p className="text-muted-foreground">
            {teacherInfo.specialization} • خبرة {teacherInfo.experience}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{teacherInfo.rating}</span>
          </div>
          <Button variant="outline" className="gap-2">
            <Bell className="w-4 h-4" />
            التنبيهات
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
                <p className="text-2xl font-bold">{teacherInfo.totalStudents}</p>
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
                <p className="text-2xl font-bold">{teacherInfo.activeCourses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">التقييم</p>
                <p className="text-2xl font-bold">{teacherInfo.rating}/5</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الحصص اليوم</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="students">طلابي</TabsTrigger>
          <TabsTrigger value="schedule">جدولي</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الحصص القادمة</CardTitle>
                <CardDescription>جدول حصصك لليوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{session.student}</h4>
                        <p className="text-sm text-muted-foreground">{session.course}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.time} • {session.duration}
                        </p>
                      </div>
                      <Badge className={getSessionStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء الطلاب</CardTitle>
                <CardDescription>ملخص أداء طلابك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.slice(0, 3).map((student) => (
                    <div key={student.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">التقدم: {student.progress}%</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          الحضور: {student.attendance}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                إدارة الطلاب
              </CardTitle>
              <CardDescription>
                متابعة وإدارة تقدم طلابك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
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
                              <Textarea 
                                value={editingStudent.notes}
                                onChange={(e) => setEditingStudent({...editingStudent, notes: e.target.value})}
                                className="w-64"
                                rows={2}
                              />
                            </div>
                          ) : (
                            <>
                              <h4 className="font-medium">{student.name}</h4>
                              <p className="text-sm text-muted-foreground">{student.course}</p>
                              <p className="text-xs text-muted-foreground">
                                آخر حصة: {student.lastSession}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(student.status)}>
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
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {editingStudent?.id !== student.id && (
                      <>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-sm text-muted-foreground">التقدم</span>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{student.progress}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">الحضور</span>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${student.attendance}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{student.attendance}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <h5 className="text-sm font-medium mb-1">ملاحظات المعلم:</h5>
                          <p className="text-sm text-muted-foreground">{student.notes}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                جدول الحصص
              </CardTitle>
              <CardDescription>
                إدارة جدولك اليومي والأسبوعي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-semibold text-primary">{session.date}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.time}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{session.student}</h3>
                        <p className="text-sm text-muted-foreground">{session.course}</p>
                        <p className="text-xs text-muted-foreground">{session.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getSessionStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                      {session.status === 'مجدولة' && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleCompleteSession(session.id)}>
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRescheduleSession(session.id)}>
                            <Calendar className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleCancelSession(session.id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reports List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    تقارير الطلاب
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div key={report.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">{report.student}</h4>
                          <span className="text-sm text-muted-foreground">{report.date}</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{report.memorization}%</div>
                            <div className="text-xs text-muted-foreground">الحفظ</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{report.recitation}%</div>
                            <div className="text-xs text-muted-foreground">التلاوة</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{report.tajweed}%</div>
                            <div className="text-xs text-muted-foreground">التجويد</div>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <h5 className="text-sm font-medium mb-1">ملاحظات:</h5>
                          <p className="text-sm text-muted-foreground">{report.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add New Report */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>إضافة تقرير جديد</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>الطالب</Label>
                    <Select value={newReport.student} onValueChange={(value) => setNewReport({...newReport, student: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الطالب" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.name}>
                            {student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>الحفظ (%)</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100"
                      value={newReport.memorization}
                      onChange={(e) => setNewReport({...newReport, memorization: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>التلاوة (%)</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100"
                      value={newReport.recitation}
                      onChange={(e) => setNewReport({...newReport, recitation: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>التجويد (%)</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100"
                      value={newReport.tajweed}
                      onChange={(e) => setNewReport({...newReport, tajweed: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>ملاحظات</Label>
                    <Textarea 
                      value={newReport.notes}
                      onChange={(e) => setNewReport({...newReport, notes: e.target.value})}
                      placeholder="أضف ملاحظاتك هنا..."
                      rows={3}
                    />
                  </div>
                  
                  <Button className="w-full" onClick={handleAddReport}>
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة التقرير
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;
