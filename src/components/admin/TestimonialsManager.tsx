
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Trash2, Edit, PlusCircle } from 'lucide-react';

// --- Type Definitions ---
interface Testimonial {
  id: number;
  studentName: string;
  country?: string;
  testimonialText?: string;
  imageUrl?: string; 
  order: number;
  isActive: boolean;
}

interface TestimonialFormData {
  id?: number;
  studentName: string;
  country: string;
  testimonialText: string;
  order: number;
  isActive: boolean;
  imageFile?: File | null; 
}

const API_BASE_URL = 'https://tibyanacademy.runasp.net/api/Testimonials';
const IMAGE_BASE_URL = "https://tibyanacademy.runasp.net";

// --- Helper Functions ---
const getFullImageUrl = (url: string | undefined) => {
    if (!url) return './placeholder.svg';
    if (url.startsWith('http') || url.startsWith('https')) {
        return url;
    }
    return `${IMAGE_BASE_URL}${url}`;
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Handle cases where the token is not available
        console.error("Authentication token not found!");
        return {};
    }
    return { 'Authorization': `Bearer ${token}` };
};


// --- API Functions ---
const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const response = await fetch(`${API_BASE_URL}/GetAllTestimonials`);
  if (!response.ok) throw new Error('Failed to fetch testimonials');
  return response.json();
};

const createOrUpdateTestimonial = async (formData: TestimonialFormData) => {
  const data = new FormData();
  
  data.append('StudentName', formData.studentName);
  data.append('Country', formData.country || '');
  data.append('TestimonialText', formData.testimonialText || '');
  data.append('Order', formData.order.toString());
  data.append('IsActive', formData.isActive.toString());
  if (formData.imageFile) {
    data.append('ImageUrl', formData.imageFile);
  }

  const url = formData.id
    ? `${API_BASE_URL}/UpdateTestimonial?id=${formData.id}`
    : `${API_BASE_URL}/AddTestimonial`;

  const method = formData.id ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: getAuthHeaders(), // *** THIS IS THE FIX ***
    body: data
  });

  if (!response.ok) {
    const errorText = await response.text();
    // Handle specific auth error
    if (response.status === 401) {
        throw new Error("Unauthorized: Please log in again.");
    }
    console.error("Backend Error:", errorText);
    throw new Error(`Failed to ${formData.id ? 'update' : 'create'} testimonial`);
  }
  return response.text();
};

const deleteTestimonial = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/DeleteTestimonial?id=${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders() // *** THIS IS THE FIX ***
  });

  if (!response.ok) {
    const errorText = await response.text();
     if (response.status === 401) {
        throw new Error("Unauthorized: Please log in again.");
    }
    throw new Error(`Failed to delete testimonial: ${errorText}`);
  }
  return response.text();
};

// --- Component ---
export const TestimonialsManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<TestimonialFormData> | null>(null);

  const { data: testimonials = [], isLoading, error } = useQuery<Testimonial[], Error>({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  const mutation = useMutation({
    mutationFn: createOrUpdateTestimonial,
    onSuccess: (successMessage) => {
      toast({ title: "نجاح", description: successMessage || "تمت العملية بنجاح." });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setIsDialogOpen(false);
      setEditingItem(null);
    },
    onError: (err: Error) => {
      toast({ title: "خطأ", description: err.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: (successMessage) => {
      toast({ title: "نجاح", description: successMessage || "تم الحذف بنجاح" });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
    onError: (err: Error) => {
      toast({ title: "خطأ", description: err.message, variant: 'destructive' });
    },
  });

  const openDialogForNew = () => {
    setEditingItem({ studentName: '', country: '', testimonialText: '', order: 0, isActive: true, imageFile: null });
    setIsDialogOpen(true);
  };

  const openDialogForEdit = (item: Testimonial) => {
    setEditingItem({ 
        ...item, 
        country: item.country || '', 
        testimonialText: item.testimonialText || '',
        imageFile: null 
    });
    setIsDialogOpen(true);
  };

  const handleFormSubmit = () => {
    if (!editingItem) return;
    if (!editingItem.studentName) {
      toast({ title: "بيانات ناقصة", description: "اسم الطالب حقل مطلوب.", variant: "destructive" });
      return;
    }
    mutation.mutate(editingItem as TestimonialFormData);
  };
  
  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin"/></div>;
  if (error) return <div className="text-red-500 p-4">خطأ في تحميل البيانات: {error.message}</div>;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>إدارة شهادات الطلاب</CardTitle>
          <CardDescription>إضافة وتعديل وحذف شهادات وآراء الطلاب.</CardDescription>
        </div>
        <Button onClick={openDialogForNew}><PlusCircle className="ml-2 h-4 w-4"/> إضافة شهادة</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الصورة</TableHead>
              <TableHead className="text-right">اسم الطالب</TableHead>
              <TableHead className="text-right">الدولة</TableHead>
              <TableHead className="text-right">الترتيب</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <img 
                    src={getFullImageUrl(item.imageUrl)}
                    alt={item.studentName} 
                    className="h-12 w-12 rounded-full object-cover" 
                    onError={(e) => { e.currentTarget.src = './placeholder.svg'; }}
                  />
                </TableCell>
                <TableCell className="text-right font-medium">{item.studentName}</TableCell>
                <TableCell className="text-right">{item.country}</TableCell>
                <TableCell className="text-right">{item.order}</TableCell>
                <TableCell className="text-right">{item.isActive ? "فعال" : "غير فعال"}</TableCell>
                <TableCell className="text-right space-x-2 space-x-reverse">
                  <Button variant="outline" size="sm" onClick={() => openDialogForEdit(item)}><Edit className="h-4 w-4"/></Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(item.id)} disabled={deleteMutation.isPending}><Trash2 className="h-4 w-4"/></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem?.id ? 'تعديل شهادة' : 'إضافة شهادة جديدة'}</DialogTitle>
              <DialogDescription>
                املأ تفاصيل الشهادة هنا. انقر على "حفظ" عند الانتهاء.
              </DialogDescription>
            </DialogHeader>
            {editingItem && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="studentName">اسم الطالب</Label>
                        <Input id="studentName" value={editingItem.studentName} onChange={(e) => setEditingItem({ ...editingItem, studentName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">الدولة</Label>
                        <Input id="country" value={editingItem.country} onChange={(e) => setEditingItem({ ...editingItem, country: e.target.value })} />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonialText">نص الشهادة</Label>
                  <Textarea id="testimonialText" value={editingItem.testimonialText} onChange={(e) => setEditingItem({ ...editingItem, testimonialText: e.target.value })} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="order">الترتيب</Label>
                        <Input id="order" type="number" value={editingItem.order} onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value, 10) || 0 })} />
                    </div>
                    <div className="flex items-end pb-2">
                        <div className="flex items-center space-x-2 space-x-reverse pt-4">
                            <Checkbox id="isActive" checked={editingItem.isActive} onCheckedChange={(checked) => setEditingItem({ ...editingItem, isActive: !!checked })} />
                            <Label htmlFor="isActive">فعال</Label>
                        </div>
                    </div>
                 </div>
                <div className="space-y-2">
                  <Label htmlFor="image">صورة الطالب (اختياري)</Label>
                  <Input id="image" type="file" accept="image/*" onChange={(e) => setEditingItem({ ...editingItem, imageFile: e.target.files ? e.target.files[0] : null })} />
                  <p className="text-xs text-muted-foreground">اترك الحقل فارغاً للإبقاء على الصورة الحالية عند التعديل.</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild><Button variant="ghost">إلغاء</Button></DialogClose>
              <Button onClick={handleFormSubmit} disabled={mutation.isPending}>
                {mutation.isPending ? <><Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري الحفظ...</> : 'حفظ'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
