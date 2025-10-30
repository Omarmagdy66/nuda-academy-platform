
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Trash2, RefreshCw } from 'lucide-react';

const API_BASE_URL = "https://tibyanacademy.runasp.net";

interface Application {
  id: number;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  userType: string;
  course: string;
  notes: string;
  submissionDate: string;
}

export const ApplicationsViewer = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApplications = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const response = await axios.get(`${API_BASE_URL}/api/applications`, config);
      // Sort by most recent
      setApplications(response.data.sort((a: Application, b: Application) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()));
    } catch (error) {
      toast({ title: "فشل جلب طلبات التسجيل", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطلب؟ سيتم حذفه نهائياً.")) return;
    
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_BASE_URL}/api/applications/${id}`, config);
      toast({ title: "تم حذف الطلب بنجاح" });
      fetchApplications();
    } catch (error) {
      toast({ title: "فشل حذف الطلب", variant: "destructive" });
    }
  };

  return (
    <Card dir="rtl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>طلبات التسجيل الواردة</CardTitle>
            <CardDescription>عرض جميع طلبات التسجيل المقدمة من الزوار.</CardDescription>
          </div>
          <Button onClick={fetchApplications} variant="outline" size="sm" disabled={isLoading}>
            <RefreshCw className={`ml-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> تحديث
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الدورة المطلوبة</TableHead>
              <TableHead>تاريخ التقديم</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center">جاري التحميل...</TableCell></TableRow>
            ) : applications.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center h-24">لا توجد طلبات تسجيل حالياً.</TableCell></TableRow>
            ) : (
              applications.map(app => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.applicantName}</TableCell>
                  <TableCell>{app.applicantEmail}</TableCell>
                  <TableCell>{app.course}</TableCell>
                  <TableCell>{new Date(app.submissionDate).toLocaleDateString('ar-EG')}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(app.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
