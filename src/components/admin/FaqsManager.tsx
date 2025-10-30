
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const API_BASE_URL = "https://tibyanacademy.runasp.net";

interface Faq {
  id: number;
  question: string;
  answer: string;
  isActive: boolean;
}

export const FaqsManager = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<Faq> | null>(null);

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/faqs/all`);
      setFaqs(response.data);
    } catch (error) {
      toast({ title: "فشل جلب الأسئلة الشائعة", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSave = async () => {
    if (!currentFaq) return;

    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      if (currentFaq.id) {
        await axios.put(`${API_BASE_URL}/api/faqs/${currentFaq.id}`, currentFaq, config);
        toast({ title: "تم تحديث السؤال بنجاح" });
      } else {
        await axios.post(`${API_BASE_URL}/api/faqs`, currentFaq, config);
        toast({ title: "تم إضافة السؤال بنجاح" });
      }
      fetchFaqs();
      setIsDialogOpen(false);
      setCurrentFaq(null);
    } catch (error) {
      toast({ title: "حدث خطأ أثناء الحفظ", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذا السؤال؟")) return;
    
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_BASE_URL}/api/faqs/${id}`, config);
      toast({ title: "تم حذف السؤال بنجاح" });
      fetchFaqs();
    } catch (error) {
      toast({ title: "فشل حذف السؤال", variant: "destructive" });
    }
  };

  const openDialog = (faq: Partial<Faq> | null = null) => {
    setCurrentFaq(faq ? { ...faq } : { question: '', answer: '', isActive: true });
    setIsDialogOpen(true);
  };

  return (
    <Card dir="rtl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>إدارة الأسئلة الشائعة</CardTitle>
            <CardDescription>إضافة، تعديل، وحذف الأسئلة والأجوبة في الموقع.</CardDescription>
          </div>
          <Button onClick={() => openDialog()}>
            <PlusCircle className="ml-2 h-4 w-4" /> إضافة سؤال
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">السؤال</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={3} className="text-center">جاري التحميل...</TableCell></TableRow>
            ) : (
              faqs.map(faq => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium">{faq.question}</TableCell>
                  <TableCell>{faq.isActive ? "نشط" : "غير نشط"}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openDialog(faq)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(faq.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[525px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>{currentFaq?.id ? 'تعديل السؤال' : 'إضافة سؤال جديد'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="question">السؤال</Label>
                <Input id="question" value={currentFaq?.question || ''} onChange={e => setCurrentFaq(f => ({ ...f, question: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">الجواب</Label>
                <Textarea id="answer" value={currentFaq?.answer || ''} onChange={e => setCurrentFaq(f => ({ ...f, answer: e.target.value }))} className="min-h-[120px]" />
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">إلغاء</Button>
                </DialogClose>
                <Button onClick={handleSave}>حفظ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
