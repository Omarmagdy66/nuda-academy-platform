
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Trash2, Edit, PlusCircle } from 'lucide-react';

// --- Zod Schema ---
const categorySchema = z.object({
  name: z.string().min(1, "اسم الفئة مطلوب"),
  description: z.string().optional().nullable(),
  isActive: z.boolean(),
});
type CategoryFormValues = z.infer<typeof categorySchema>;

// --- Interfaces ---
interface PackageCategory extends CategoryFormValues {
  id: number;
}

// --- API Functions ---
const apiBaseUrl = 'https://tibyanacademy.runasp.net/api/PackageCategory'; // Use absolute URL

const handleApiResponse = async (response: Response) => {
  const text = await response.text();
  if (!response.ok) {
    try {
        const errorJson = JSON.parse(text);
        if (errorJson.errors) {
            const errorMessages = Object.values(errorJson.errors).flat().join(' \n');
            throw new Error(errorMessages);
        }
        throw new Error(errorJson.title || text);
    } catch (e) {
        throw new Error(text || `Request failed with status: ${response.status}`);
    }
  }

  if (!text) {
      return "Success";
  }
  try {
      return JSON.parse(text);
  } catch (e) {
      return text; // Return plain text if not JSON
  }
};

const fetchCategories = async (): Promise<PackageCategory[]> => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${apiBaseUrl}/GetAllPackageCategories`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (res.status === 404) {
    return []; // Not Found is a valid case (no categories yet)
  }
  if (!res.ok) {
    throw new Error('فشل في جلب الفئات');
  }
  const data = await res.json();
  if (!Array.isArray(data)) return []; // Return empty array if data is not an array
  return data.map((cat: any) => ({ ...cat, description: cat.description || '' }));
};

const createCategory = async (newCategory: CategoryFormValues) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${apiBaseUrl}/CreatePackageCategory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(newCategory),
  });
  return handleApiResponse(res);
};

const updateCategory = async ({ id, ...updatedCategory }: PackageCategory) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${apiBaseUrl}/UpdatePackageCategory?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(updatedCategory),
  });
  return handleApiResponse(res);
};

const deleteCategory = async (id: number) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${apiBaseUrl}/DeletePackageCategory?id=${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleApiResponse(res);
};


// --- Components ---

const CategoryForm = ({ category, onFinished }: { category?: PackageCategory, onFinished: () => void }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: category ? { ...category } : { name: '', description: '', isActive: true },
  });

  const onMutationSuccess = (message: string) => {
    queryClient.invalidateQueries({ queryKey: ['packageCategories'] });
    toast({ title: 'نجاح', description: message });
    onFinished();
  };

  const onMutationError = (error: Error) => {
    toast({
      title: "حدث خطأ",
      description: error.message || "لم نتمكن من حفظ التغييرات.",
      variant: "destructive",
    });
  };

  const createMutation = useMutation({ mutationFn: createCategory, onSuccess: () => onMutationSuccess('تم إنشاء الفئة بنجاح'), onError: onMutationError });
  const updateMutation = useMutation({ mutationFn: updateCategory, onSuccess: () => onMutationSuccess('تم تحديث الفئة بنجاح'), onError: onMutationError });

  const onSubmit = (values: CategoryFormValues) => {
    if (category) {
      updateMutation.mutate({ id: category.id, ...values });
    } else {
      createMutation.mutate(values);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-right">
        <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>اسم الفئة</FormLabel><FormControl><Input placeholder="مثال: باقات أونلاين" {...field} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="description" render={({ field }) => <FormItem><FormLabel>الوصف</FormLabel><FormControl><Textarea placeholder="وصف قصير للفئة..." {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="isActive" render={({ field }) => (
            <FormItem className="rounded-lg border p-4">
                 <div className="flex flex-row items-center justify-between">
                    <FormLabel>تفعيل الفئة</FormLabel>
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                </div>
                <FormDescription className="pt-2">عند تفعيلها، ستظهر الفئة في الموقع.</FormDescription>
            </FormItem>
        )} />
        <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? <><Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري الحفظ...</> : 'حفظ'}</Button>
      </form>
    </Form>
  );
};

export const PackageCategoryManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory | undefined>(undefined);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: categories, isLoading, error } = useQuery<PackageCategory[], Error>({ queryKey: ['packageCategories'], queryFn: fetchCategories });
  
  const deleteMutation = useMutation({ 
    mutationFn: deleteCategory, 
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['packageCategories'] });
      toast({title: 'نجاح', description: 'تم حذف الفئة بنجاح'});
    }, 
    onError: (err: Error) => {
      toast({title: 'خطأ', description: err.message, variant: 'destructive'});
    }
  });

  const openDialog = (category?: PackageCategory) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>إدارة فئات الباقات</CardTitle>
          <CardDescription>إضافة وتعديل وحذف فئات الباقات.</CardDescription>
        </div>
        <Button onClick={() => openDialog()}><PlusCircle className="h-4 w-4 ml-2"/> إضافة فئة</Button>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}
        {error && <p className="text-red-500 text-center p-4">{error.message}</p>}
        {categories && categories.length > 0 && (
            <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم الفئة</TableHead>
                    <TableHead className="text-right">الوصف</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map(cat => (
                        <TableRow key={cat.id} className={!cat.isActive ? 'bg-muted/50' : ''}>
                            <TableCell className="font-medium">{cat.name}</TableCell>
                            <TableCell>{cat.description}</TableCell>
                            <TableCell>{cat.isActive ? 'مفعلة' : 'معطلة'}</TableCell>
                            <TableCell className="space-x-2 whitespace-nowrap">
                                <Button variant="outline" size="sm" onClick={() => openDialog(cat)}><Edit className="h-4 w-4 ml-1" />تعديل</Button>
                                <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(cat.id)} disabled={deleteMutation.isPending}><Trash2 className="h-4 w-4 ml-1" />حذف</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
        {categories && categories.length === 0 && (
          <div className="text-center p-8 text-gray-500 dark:text-gray-400">
            <p>لم يتم العثور على أي فئات بعد.</p>
            <p className="mt-2">انقر على زر "إضافة فئة" للبدء بإنشاء أول فئة.</p>
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-right">{selectedCategory ? 'تعديل فئة' : 'إنشاء فئة جديدة'}</DialogTitle>
            </DialogHeader>
            <div className="py-4 max-h-[80vh] overflow-y-auto px-2">
              <CategoryForm category={selectedCategory} onFinished={() => setIsDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
