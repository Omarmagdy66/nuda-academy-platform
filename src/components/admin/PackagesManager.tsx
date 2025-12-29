
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Trash2, Edit, PlusCircle } from 'lucide-react';

// Zod schema for package form validation (in Arabic)
const packageSchema = z.object({
  name: z.string().min(1, "اسم الباقة مطلوب"),
  price: z.coerce.number().min(0, "يجب أن يكون السعر رقمًا موجبًا"),
  features: z.string().min(1, "المميزات مطلوبة (مفصولة بفاصلة)"),
  isActive: z.boolean(),
});
type PackageFormValues = z.infer<typeof packageSchema>;

interface Package extends PackageFormValues {
  id: number;
}

// API Functions with improved error handling and features transformation
const apiBaseUrl = 'https://tibyanacademy.runasp.net/api/Packages';

const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    // Try to parse the error text as JSON for a more detailed message
    try {
        const errorJson = JSON.parse(errorText);
        // Extract validation errors if they exist
        if (errorJson.errors) {
            const errorMessages = Object.values(errorJson.errors).flat().join(' \n');
            throw new Error(errorMessages);
        }
        throw new Error(errorJson.title || errorText);
    } catch (e) {
        // If parsing fails, use the raw text
        throw new Error(errorText || `فشل الطلب مع الحالة: ${response.status}`);
    }
  }
  return response.text();
};

const fetchPackages = async (): Promise<Package[]> => {
  const res = await fetch(`${apiBaseUrl}/GetAllPackages`);
  if (!res.ok) throw new Error('فشل في جلب الباقات');
  const packages = await res.json();
  // The backend sends features as an array, but the form needs a string.
  return packages.map((pkg: any) => ({ ...pkg, features: Array.isArray(pkg.features) ? pkg.features.join(', ') : pkg.features }));
};

const createPackage = async (newPackage: PackageFormValues) => {
  const token = localStorage.getItem('token');
  const payload = {
    ...newPackage,
    features: newPackage.features.split(',').map(f => f.trim()).filter(f => f), // Convert string to string array
  };
  const res = await fetch(`${apiBaseUrl}/CreatePackage`, {
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
    features: updatedPackage.features.split(',').map(f => f.trim()).filter(f => f), // Convert string to string array
  };
  const res = await fetch(`${apiBaseUrl}/UpdatePackage?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  return handleApiResponse(res);
};

const deletePackage = async (id: number) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${apiBaseUrl}/DeletePackage?id=${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleApiResponse(res);
};


// Component for the form (in Arabic)
const PackageForm = ({ pkg, onFinished }: { pkg?: Package, onFinished: () => void }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: pkg ? { ...pkg } : { name: '', price: 0, features: '', isActive: true },
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
  
  const createMutation = useMutation({ 
    mutationFn: createPackage, 
    onSuccess: () => onMutationSuccess('تم إنشاء الباقة بنجاح'),
    onError: onMutationError,
  });
  const updateMutation = useMutation({ 
    mutationFn: updatePackage, 
    onSuccess: () => onMutationSuccess('تم تحديث الباقة بنجاح'),
    onError: onMutationError,
  });


  const onSubmit = (values: PackageFormValues) => {
    if (pkg) {
      updateMutation.mutate({ id: pkg.id, ...values });
    } else {
      createMutation.mutate(values);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-right">
        <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>اسم الباقة</FormLabel><FormControl><Input placeholder="مثال: الباقة الذهبية" {...field} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="price" render={({ field }) => <FormItem><FormLabel>السعر (بالريال السعودي)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="features" render={({ field }) => <FormItem><FormLabel>مميزات الباقة</FormLabel><FormControl><Input placeholder="اكتب المميزات مفصولة بفاصلة، مثال: 4 جلسات, متابعة" {...field} /></FormControl><FormMessage /></FormItem>} />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>تفعيل الباقة</FormLabel>
                <FormDescription>
                  عند تفعيلها، ستظهر الباقة في صفحات الموقع للعملاء.
                </FormDescription>
              </div>
              {/* Fix for RTL Switch issue */}
              <FormControl dir="ltr">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? <><Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري الحفظ...</> : 'حفظ'}</Button>
      </form>
    </Form>
  );
};

// Main component to manage packages (in Arabic)
export const PackagesManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>(undefined);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: packages, isLoading, error } = useQuery<Package[], Error>({ queryKey: ['packages'], queryFn: fetchPackages });
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
        {packages && (
            <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم الباقة</TableHead>
                    <TableHead className="text-right">السعر</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {packages.map(pkg => (
                        <TableRow key={pkg.id}>
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-right">{selectedPackage ? 'تعديل باقة' : 'إنشاء باقة جديدة'}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <PackageForm pkg={selectedPackage} onFinished={() => setIsDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
