
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

// --- API Base URL ---
const API_BASE_URL = "https://tibyanacademy.runasp.net";

// Helper to get the auth token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");

interface Testimonial {
  id: number;
  studentName: string;
  country?: string;
  testimonialText: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
}

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  // Form State
  const [studentName, setStudentName] = useState("");
  const [country, setCountry] = useState("");
  const [testimonialText, setTestimonialText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const token = getAuthToken();
      const response = await axios.get<Testimonial[]>(`${API_BASE_URL}/api/testimonials/all`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      setTestimonials(response.data);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في جلب آراء الطلاب.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setStudentName("");
    setCountry("");
    setTestimonialText("");
    setImageUrl(null);
    setSelectedFile(null);
    setEditingItem(null);
    setIsUploading(false);
  };

  const handleOpenDialogForNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleOpenDialogForEdit = (item: Testimonial) => {
    resetForm();
    setEditingItem(item);
    setStudentName(item.studentName);
    setCountry(item.country || "");
    setTestimonialText(item.testimonialText);
    setImageUrl(item.imageUrl || null);
    setIsDialogOpen(true);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    const token = getAuthToken();

    try {
      const response = await axios.post<{ url: string }>(`${API_BASE_URL}/api/files/upload`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      setImageUrl(response.data.url);
      toast({ title: "تم بنجاح", description: "تم رفع الصورة بنجاح." });
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في رفع الصورة.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    const token = getAuthToken();
    const data = { 
      studentName, 
      country, 
      testimonialText, 
      imageUrl,
      order: editingItem?.order || 0,
      isActive: editingItem?.isActive === undefined ? true : editingItem.isActive
    };
    
    try {
      if (editingItem) {
        await axios.put(`${API_BASE_URL}/api/testimonials/${editingItem.id}`, { ...data, id: editingItem.id }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        toast({ title: "تم بنجاح", description: "تم تحديث الرأي." });
      } else {
        await axios.post(`${API_BASE_URL}/api/testimonials`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        toast({ title: "تم بنجاح", description: "تمت إضافة الرأي بنجاح." });
      }
      fetchItems();
      setIsDialogOpen(false);
    } catch (error) {
       toast({ title: "خطأ", description: "فشلت عملية الحفظ.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذا الرأي؟")) return;
    const token = getAuthToken();
    try {
      await axios.delete(`${API_BASE_URL}/api/testimonials/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: "تم الحذف", description: "تم حذف الرأي بنجاح." });
      fetchItems();
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في حذف الرأي.", variant: "destructive" });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة آراء الطلاب</CardTitle>
        <Button onClick={handleOpenDialogForNew}>إضافة رأي جديد</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الطالب</TableHead>
              <TableHead>الرأي</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={3} className="text-center">جاري التحميل...</TableCell></TableRow>
            ) : (
              testimonials.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.studentName}</TableCell>
                  <TableCell>{item.testimonialText.substring(0, 50)}...</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenDialogForEdit(item)}>تعديل</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>حذف</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "تعديل رأي" : "إضافة رأي جديد"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sName">اسم الطالب</Label>
              <Input id="sName" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">البلد</Label>
              <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text">نص الرأي</Label>
              <Textarea id="text" value={testimonialText} onChange={(e) => setTestimonialText(e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label>صورة الطالب (اختياري)</Label>
              <div className="flex items-center gap-4">
                <Input type="file" accept="image/*" onChange={handleFileChange} className="flex-1" />
                <Button onClick={handleImageUpload} disabled={!selectedFile || isUploading}>
                  {isUploading ? "جاري الرفع..." : "رفع الصورة"}
                </Button>
              </div>
              {imageUrl && (
                <div className="mt-4">
                  <p>معاينة الصورة:</p>
                  <img src={imageUrl.startsWith('blob:') ? imageUrl : `${API_BASE_URL}${imageUrl}`} alt="Preview" className="w-24 h-24 rounded-full object-cover mt-2" />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button onClick={handleSave}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
