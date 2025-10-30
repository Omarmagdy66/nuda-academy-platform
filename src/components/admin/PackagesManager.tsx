
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const API_BASE_URL = "https://tibyanacademy.runasp.net";

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string; // Comma-separated
  isMostPopular: boolean;
  isActive: boolean;
}

export const PackagesManager = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<Partial<Package> | null>(null);

  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/packages/all`);
      setPackages(response.data);
    } catch (error) {
      toast({ title: "فشل جلب الباقات", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSave = async () => {
    if (!currentPackage) return;

    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    const payload = { ...currentPackage, price: Number(currentPackage.price) };

    try {
      if (currentPackage.id) {
        // Update existing package
        await axios.put(`${API_BASE_URL}/api/packages/${currentPackage.id}`, payload, config);
        toast({ title: "تم تحديث الباقة بنجاح" });
      } else {
        // Create new package
        await axios.post(`${API_BASE_URL}/api/packages`, payload, config);
        toast({ title: "تم إضافة الباقة بنجاح" });
      }
      fetchPackages();
      setIsDialogOpen(false);
      setCurrentPackage(null);
    } catch (error) {
      toast({ title: "حدث خطأ أثناء الحفظ", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذه الباقة؟")) return;
    
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_BASE_URL}/api/packages/${id}`, config);
      toast({ title: "تم حذف الباقة بنجاح" });
      fetchPackages();
    } catch (error) {
      toast({ title: "فشل حذف الباقة", variant: "destructive" });
    }
  };

  const openDialog = (pkg: Partial<Package> | null = null) => {
    setCurrentPackage(pkg ? { ...pkg } : { name: '', description: '', price: 0, features: '', isMostPopular: false, isActive: true });
    setIsDialogOpen(true);
  };

  return (
    <Card dir="rtl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>إدارة الباقات</CardTitle>
            <CardDescription>إضافة، تعديل، وحذف باقات الأسعار.</CardDescription>
          </div>
          <Button onClick={() => openDialog()}>
            <PlusCircle className="ml-2 h-4 w-4" /> إضافة باقة
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الباقة</TableHead>
              <TableHead>السعر (ر.س)</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الأكثر شيوعاً</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center">جاري التحميل...</TableCell></TableRow>
            ) : (
              packages.map(pkg => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>{pkg.price}</TableCell>
                  <TableCell>{pkg.isActive ? "نشط" : "غير نشط"}</TableCell>
                  <TableCell>{pkg.isMostPopular ? "نعم" : "لا"}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openDialog(pkg)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(pkg.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[525px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>{currentPackage?.id ? 'تعديل باقة' : 'إضافة باقة جديدة'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">الاسم</Label>
                <Input id="name" value={currentPackage?.name || ''} onChange={e => setCurrentPackage(p => ({ ...p, name: e.target.value }))} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">الوصف</Label>
                <Input id="description" value={currentPackage?.description || ''} onChange={e => setCurrentPackage(p => ({ ...p, description: e.target.value }))} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">السعر</Label>
                <Input id="price" type="number" value={currentPackage?.price || 0} onChange={e => setCurrentPackage(p => ({ ...p, price: Number(e.target.value) }))} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="features" className="text-right">الميزات</Label>
                <Textarea id="features" value={currentPackage?.features || ''} onChange={e => setCurrentPackage(p => ({ ...p, features: e.target.value }))} className="col-span-3" placeholder="افصل بين الميزات بفاصلة (,)" />
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                 <Checkbox id="isMostPopular" checked={currentPackage?.isMostPopular || false} onCheckedChange={checked => setCurrentPackage(p => ({ ...p, isMostPopular: !!checked }))} />
                 <Label htmlFor="isMostPopular">تعليم كـ "الأكثر شيوعاً"</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                 <Checkbox id="isActive" checked={currentPackage?.isActive || false} onCheckedChange={checked => setCurrentPackage(p => ({ ...p, isActive: !!checked }))} />
                 <Label htmlFor="isActive">تفعيل الباقة (ستظهر في الموقع)</Label>
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
