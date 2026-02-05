
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Trash2, Edit, PlusCircle, Star } from 'lucide-react';

// --- Zod Schema ---
const packageSchema = z.object({
  name: z.string().min(1, "اسم الباقة مطلوب"),
  description: z.string().optional().nullable(),
  price: z.coerce.number().min(0, "يجب أن يكون السعر رقمًا موجبًا"),
  features: z.string().min(1, "المميزات مطلوبة (مفصولة بفاصلة)"),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  packageCategoryId: z.coerce.number().nullable().optional(),
});
type PackageFormValues = z.infer<typeof packageSchema>;

// --- Interfaces ---
interface PackageCategory {
  id: number;
  name: string;
}
interface Package extends PackageFormValues {
  id: number;
}

// --- API Functions ---
const apiBaseUrl = 'https://tibyanacademy.runasp.net/api'; // Use absolute URL

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

const fetchPackages = async (): Promise<Package[]> => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${apiBaseUrl}/Packages/GetAllPackages`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error('فشل في جلب الباقات');
  const packages = await res.json();
  if (!Array.isArray(packages)) return [];
  return packages.map((pkg: any) => ({ 
      ...pkg, 
      features: Array.isArray(pkg.features) ? pkg.features.join(', ') : '',
      description: pkg.description || '' 
    }));
};

const fetchPackageCategories = async (): Promise<PackageCategory[]> => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${apiBaseUrl}/PackageCategory/GetAllPackageCategories`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.status === 404) return [];
    if (!res.ok) throw new Error('فشل في جلب فئات الباقات');
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data;
}

const createPackage = async (newPackage: PackageFormValues) => {
  const token = localStorage.getItem('token');
  const payload = {
    ...newPackage,
    features: newPackage.features.split(',').map(f => f.trim()).filter(f => f),
  };
  const res = await fetch(`${apiBaseUrl}/Packages/CreatePackage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  return handleApiResponse(res);
};

const updatePackage = async ({ id, ...updatedPackage }: Package) => {
  const token = localStorage.getItem('token');
  const payload = {
    ...updatedPackage,
    features: updatedPackage.features.split(',').map(f => f.trim()).filter(f => f),
  };
  const res = await fetch(`${apiBaseUrl}/Packages/UpdatePackage?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  return handleApiResponse(res);
};

const deletePackage = async (id: number) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${apiBaseUrl}/Packages/DeletePackage?id=${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleApiResponse(res);
};


// --- Components ---

const PackageForm = ({ pkg, categories, onFinished }: { pkg?: Package, categories: PackageCategory[], onFinished: () => void }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const defaultValues = pkg ? { ...pkg } : {
    name: '',
    description: '',
    price: 0,
    features: '',
    isActive: true,
    isFeatured: false,
    packageCategoryId: null,
  };

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues,
  });

  const onMutationSuccess = (message: string) => {
    queryClient.invalidateQueries({ queryKey: ['packages'] });
    toast({ title: 'نجاح', description: message });
    onFinished();
  };

  const onMutationError = (error: Error) => {
    toast({
      title: "حدث خطأ",
      description: error.message || "لم نتمكن من حفظ التغييرات. الرجاء المحاولة مرة أخرى.",
      variant: "destructive",
    });
  };
  
  const createMutation = useMutation({ mutationFn: createPackage, onSuccess: () => onMutationSuccess('تم إنشاء الباقة بنجاح'), onError: onMutationError });
  const updateMutation = useMutation({ mutationFn: updatePackage, onSuccess: () => onMutationSuccess('تم تحديث الباقة بنجاح'), onError: onMutationError });

  const onSubmit = (values: PackageFormValues) => {
    const submissionValues = {
        ...values,
        packageCategoryId: values.packageCategoryId || null
    };
    if (pkg) {
      updateMutation.mutate({ id: pkg.id, ...submissionValues });
    } else {
      createMutation.mutate(submissionValues);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-right">
        <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>اسم الباقة</FormLabel><FormControl><Input placeholder="مثال: الباقة الذهبية" {...field} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="description" render={({ field }) => <FormItem><FormLabel>الوصف</FormLabel><FormControl><Textarea placeholder="وصف قصير للباقة..." {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>} />
        
        <FormField
            control={form.control}
            name="packageCategoryId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>فئة الباقة</FormLabel>
                <Select
                    dir="rtl"
                    onValueChange={(value) => field.onChange(value ? Number(value) : null)}
                    value={field.value?.toString()}
                >
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="اختر فئة (اختياري)" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {categories?.map(cat => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <FormField control={form.control} name="price" render={({ field }) => <FormItem><FormLabel>السعر (بالريال السعودي)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="features" render={({ field }) => <FormItem><FormLabel>مميزات الباقة</FormLabel><FormControl><Textarea placeholder="اكتب المميزات مفصولة بفاصلة، مثال: 4 جلسات, متابعة" {...field} /></FormControl><FormMessage /></FormItem>} />
        
        <FormField control={form.control} name="isFeatured" render={({ field }) => (
            <FormItem className="rounded-lg border p-4">
                <div className="flex flex-row items-center justify-between">
                    <FormLabel>باقة مميزة</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </div>
                <FormDescription className="pt-2">ستظهر بشكل بارز في صفحة الباقات.</FormDescription>
            </FormItem>
        )} />

        <FormField control={form.control} name="isActive" render={({ field }) => (
            <FormItem className="rounded-lg border p-4">
                <div className="flex flex-row items-center justify-between">
                    <FormLabel>تفعيل الباقة</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </div>
                <FormDescription className="pt-2">ستظهر الباقة في صفحات الموقع للعملاء.</FormDescription>
            </FormItem>
        )} />

        <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? <><Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري الحفظ...</> : 'حفظ'}</Button>
      </form>
    </Form>
  );
};

export const PackagesManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>(undefined);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: packages, isLoading: isLoadingPackages, error: packagesError } = useQuery<Package[], Error>({ queryKey: ['packages'], queryFn: fetchPackages });
  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useQuery<PackageCategory[], Error>({ queryKey: ['packageCategories'], queryFn: fetchPackageCategories });
  
  const deleteMutation = useMutation({ 
    mutationFn: deletePackage, 
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      toast({title: 'نجاح', description: 'تم حذف الباقة بنجاح'});
    }, 
    onError: (err: Error) => {
      toast({title: 'خطأ', description: err.message, variant: 'destructive'});
    }
  });

  const openDialog = (pkg?: Package) => {
    setSelectedPackage(pkg);
    setIsDialogOpen(true);
  }
  
  const isLoading = isLoadingPackages || isLoadingCategories;
  const error = packagesError || categoriesError;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>إدارة الباقات</CardTitle>
          <CardDescription>إضافة وتعديل وحذف باقات الاشتراك.</CardDescription>
        </div>
        <Button onClick={() => openDialog()}><PlusCircle className="h-4 w-4 ml-2"/> إضافة باقة</Button>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}
        {error && <p className="text-red-500 text-center p-4">{error.message}</p>}
        {packages && packages.length > 0 && (
            <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="text-right">اسم الباقة</TableHead>
                    <TableHead className="text-right">السعر</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {packages.map(pkg => (
                        <TableRow key={pkg.id} className={!pkg.isActive ? 'bg-muted/50' : ''}>
                            <TableCell>{pkg.isFeatured && <Star className="h-5 w-5 text-yellow-500" />}</TableCell>
                            <TableCell className="font-medium">{pkg.name}</TableCell>
                            <TableCell>{pkg.price} ر.س</TableCell>
                            <TableCell>{pkg.isActive ? 'مفعلة' : 'معطلة'}</TableCell>
                            <TableCell className="space-x-2 whitespace-nowrap">
                                <Button variant="outline" size="sm" onClick={() => openDialog(pkg)}><Edit className="h-4 w-4 ml-1" />تعديل</Button>
                                <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(pkg.id)} disabled={deleteMutation.isPending}><Trash2 className="h-4 w-4 ml-1" />حذف</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
        {packages && packages.length === 0 && (
          <div className="text-center p-8 text-gray-500 dark:text-gray-400">
            <p>لم يتم العثور على أي باقات بعد.</p>
            <p className="mt-2">انقر على زر "إضافة باقة" للبدء بإنشاء أول باقة.</p>
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-right">{selectedPackage ? 'تعديل باقة' : 'إنشاء باقة جديدة'}</DialogTitle>
            </DialogHeader>
            <div className="py-4 max-h-[80vh] overflow-y-auto px-2">
              <PackageForm pkg={selectedPackage} categories={categories || []} onFinished={() => setIsDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
