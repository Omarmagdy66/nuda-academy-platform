
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Trash2, Edit, UserPlus } from 'lucide-react';

// --- Type Definitions ---
interface Teacher {
  id: number;
  name: string;
  title: string;
  gender: string; 
  bio?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
}

interface TeacherFormData {
  id?: number;
  name: string;
  title: string;
  gender: string; 
  bio: string;
  order: number;
  isActive: boolean;
  imageFile?: File | null;
}

const API_BASE_URL = 'https://tibyanacademy.runasp.net/api/Teacher';
const IMAGE_BASE_URL = 'https://tibyanacademy.runasp.net';

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
        console.error("Authentication token not found!");
        return {};
    }
    return { 'Authorization': `Bearer ${token}` };
};


// --- API Functions ---
const fetchTeachers = async (): Promise<Teacher[]> => {
  const response = await fetch(`${API_BASE_URL}/GetAllTeacher`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch teachers: ${errorText}`);
  }
  return response.json();
};

const createOrUpdateTeacher = async (formData: TeacherFormData) => {
  const data = new FormData();
  
  data.append('Name', formData.name);
  data.append('Title', formData.title);
  data.append('Gender', formData.gender);
  data.append('Bio', formData.bio || '');
  data.append('Order', formData.order.toString());
  data.append('IsActive', formData.isActive.toString());
  if (formData.imageFile) {
    data.append('ImageUrl', formData.imageFile);
  }

  const url = formData.id 
    ? `${API_BASE_URL}/UpdateTeacher?id=${formData.id}` 
    : `${API_BASE_URL}/AddTeacher`;
  
  const method = formData.id ? 'PUT' : 'POST';

  const response = await fetch(url, {
      method,
      headers: getAuthHeaders(), // *** THIS IS THE FIX ***
      body: data
  });

  if (!response.ok) {
    const errorText = await response.text();
     if (response.status === 401) {
        throw new Error("Unauthorized: Please log in again.");
    }
    throw new Error(`Failed to ${formData.id ? 'update' : 'create'} teacher: ${errorText}`);
  }
  return response.text();
};

const deleteTeacher = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/DeleteTeacher?id=${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders() // *** THIS IS THE FIX ***
  });

  if (!response.ok) {
      const errorText = await response.text();
       if (response.status === 401) {
        throw new Error("Unauthorized: Please log in again.");
      }
      throw new Error(`Failed to delete teacher: ${errorText}`);
  }
  return response.text();
};


// --- Component ---

export const TeachersManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Partial<TeacherFormData> | null>(null);

  const { data: teachers = [], isLoading, error } = useQuery<Teacher[], Error>({
    queryKey: ['teachers'],
    queryFn: fetchTeachers,
  });

  const mutation = useMutation({
    mutationFn: createOrUpdateTeacher,
    onSuccess: (successMessage) => {
      toast({ title: "نجاح", description: successMessage || "تمت العملية بنجاح." });
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      setIsDialogOpen(false);
      setEditingTeacher(null);
    },
    onError: (err: Error) => {
      toast({ title: "خطأ", description: err.message, variant: 'destructive' });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: (successMessage) => {
        toast({ title: "نجاح", description: successMessage || "تم الحذف بنجاح" });
        queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },
    onError: (err: Error) => {
        toast({ title: "خطأ", description: err.message, variant: 'destructive' });
    },
  });

  const openDialogForNew = () => {
    setEditingTeacher({ name: '', title: '', gender: 'Male', bio: '', order: 0, isActive: true, imageFile: null });
    setIsDialogOpen(true);
  };

  const openDialogForEdit = (teacher: Teacher) => {
    const genderValue = teacher.gender?.toLowerCase() === 'female' || teacher.gender === 'انثي' ? 'Female' : 'Male';
    setEditingTeacher({ 
        ...teacher, 
        gender: genderValue, 
        bio: teacher.bio || '', // Ensure bio is a string
        imageFile: null 
    });
    setIsDialogOpen(true);
  };
  
  const handleFormSubmit = () => {
    if (!editingTeacher) return;
    
    if (!editingTeacher.name || !editingTeacher.title || !editingTeacher.gender) {
        toast({title: "بيانات ناقصة", description: "يرجى ملء جميع الحقول المطلوبة.", variant: "destructive"});
        return;
    }

    mutation.mutate(editingTeacher as TeacherFormData);
  };

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin"/></div>;
  if (error) return <div className="text-red-500 p-4">خطأ في تحميل البيانات: {error.message}</div>;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
            <CardTitle>إدارة المعلمين</CardTitle>
            <CardDescription>إضافة وتعديل وحذف المعلمين في الأكاديمية.</CardDescription>
        </div>
        <Button onClick={openDialogForNew}><UserPlus className="ml-2 h-4 w-4"/> إضافة معلم</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الصورة</TableHead>
              <TableHead className="text-right">الاسم</TableHead>
              <TableHead className="text-right">اللقب</TableHead>
              <TableHead className="text-right">الترتيب</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map(teacher => (
              <TableRow key={teacher.id}>
                 <TableCell>
                    <img 
                        src={getFullImageUrl(teacher.imageUrl)}
                        alt={teacher.name} 
                        className="h-12 w-12 rounded-full object-cover" 
                        onError={(e) => { e.currentTarget.src = './placeholder.svg'; }}
                    />
                </TableCell>
                <TableCell className="text-right font-medium">{teacher.name}</TableCell>
                <TableCell className="text-right">{teacher.title}</TableCell>
                <TableCell className="text-right">{teacher.order}</TableCell>
                <TableCell className="text-right">{teacher.isActive ? "فعال" : "غير فعال"}</TableCell>
                <TableCell className="text-right space-x-2 space-x-reverse">
                  <Button variant="outline" size="sm" onClick={() => openDialogForEdit(teacher)}><Edit className="h-4 w-4"/></Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(teacher.id)} disabled={deleteMutation.isPending}><Trash2 className="h-4 w-4"/></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{editingTeacher?.id ? 'تعديل بيانات المعلم' : 'إضافة معلم جديد'}</DialogTitle>
                    <DialogDescription>
                        املأ تفاصيل المعلم هنا. انقر على "حفظ التغييرات" عند الانتهاء.
                    </DialogDescription>
                </DialogHeader>
                {editingTeacher && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">الاسم</Label>
                            <Input id="name" value={editingTeacher.name} onChange={(e) => setEditingTeacher({...editingTeacher, name: e.target.value})} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="title">اللقب</Label>
                            <Input id="title" value={editingTeacher.title} onChange={(e) => setEditingTeacher({...editingTeacher, title: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">الجنس</Label>
                             <Select dir="rtl" value={editingTeacher.gender} onValueChange={(value) => setEditingTeacher({...editingTeacher, gender: value})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="اختر الجنس" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">ذكر</SelectItem>
                                    <SelectItem value="Female">أنثى</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="order">الترتيب</Label>
                            <Input id="order" type="number" value={editingTeacher.order} onChange={(e) => setEditingTeacher({...editingTeacher, order: parseInt(e.target.value, 10) || 0})} />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="bio">نبذة تعريفية</Label>
                            <Textarea id="bio" value={editingTeacher.bio} onChange={(e) => setEditingTeacher({...editingTeacher, bio: e.target.value})} />
                        </div>
                         <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="image">صورة المعلم (اختياري)</Label>
                            <Input id="image" type="file" accept="image/*" onChange={(e) => setEditingTeacher({...editingTeacher, imageFile: e.target.files ? e.target.files[0] : null})} />
                            <p className="text-xs text-muted-foreground">اترك الحقل فارغاً لاستخدام الصورة الافتراضية أو للإبقاء على الصورة الحالية عند التعديل.</p>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                             <Checkbox id="isActive" checked={editingTeacher.isActive} onCheckedChange={(checked) => setEditingTeacher({...editingTeacher, isActive: !!checked})} />
                            <Label htmlFor="isActive">معلم فعال</Label>
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">إلغاء</Button></DialogClose>
                    <Button onClick={handleFormSubmit} disabled={mutation.isPending}>
                        {mutation.isPending ? <><Loader2 className="ml-2 h-4 w-4 animate-spin"/> جاري الحفظ...</> : 'حفظ التغييرات'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

      </CardContent>
    </Card>
  );
};
