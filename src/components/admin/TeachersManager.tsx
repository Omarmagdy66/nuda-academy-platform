
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

interface Teacher {
  id: number;
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
}

export function TeachersManager() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const token = getAuthToken();
      // Admin endpoint to get all teachers
      const response = await axios.get<Teacher[]>(`${API_BASE_URL}/api/teachers/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeachers(response.data);
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في جلب بيانات المعلمين. قد تكون جلسة الدخول انتهت.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const resetForm = () => {
    setName("");
    setTitle("");
    setBio("");
    setImageUrl(null);
    setSelectedFile(null);
    setEditingTeacher(null);
    setIsUploading(false);
  };

  const handleOpenDialogForNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleOpenDialogForEdit = (teacher: Teacher) => {
    resetForm();
    setEditingTeacher(teacher);
    setName(teacher.name);
    setTitle(teacher.title);
    setBio(teacher.bio || "");
    setImageUrl(teacher.imageUrl || null);
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
    const teacherData = { 
      name, 
      title, 
      bio, 
      imageUrl,
      // Default values for fields not in the form yet
      order: editingTeacher?.order || 0,
      isActive: editingTeacher?.isActive === undefined ? true : editingTeacher.isActive
    };
    
    try {
      if (editingTeacher) {
        // Update existing teacher
        await axios.put(`${API_BASE_URL}/api/teachers/${editingTeacher.id}`, { ...teacherData, id: editingTeacher.id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast({ title: "تم بنجاح", description: "تم تحديث بيانات المعلم." });
      } else {
        // Add new teacher
        await axios.post(`${API_BASE_URL}/api/teachers`, teacherData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast({ title: "تم بنجاح", description: "تمت إضافة المعلم بنجاح." });
      }
      fetchTeachers(); // Refresh the list
      setIsDialogOpen(false); // Close dialog
    } catch (error) {
       toast({ title: "خطأ", description: "فشلت عملية الحفظ.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذا المعلم؟")) return;
    const token = getAuthToken();
    try {
      await axios.delete(`${API_BASE_URL}/api/teachers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: "تم الحذف", description: "تم حذف المعلم بنجاح." });
      fetchTeachers(); // Refresh the list
    } catch (error) {
      toast({ title: "خطأ", description: "فشل في حذف المعلم.", variant: "destructive" });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة المعلمين</CardTitle>
        <Button onClick={handleOpenDialogForNew}>إضافة معلم جديد</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الصورة</TableHead>
              <TableHead>الاسم</TableHead>
              <TableHead>اللقب</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center">جاري التحميل...</TableCell></TableRow>
            ) : (
              teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <img 
                      src={teacher.imageUrl ? `${API_BASE_URL}${teacher.imageUrl}` : "/placeholder.svg"} 
                      alt={teacher.name} 
                      className="w-12 h-12 rounded-full object-cover" 
                    />
                  </TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.title}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenDialogForEdit(teacher)}>تعديل</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(teacher.id)}>حذف</Button>
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
            <DialogTitle>{editingTeacher ? "تعديل بيانات معلم" : "إضافة معلم جديد"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم المعلم</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">اللقب / التخصص</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">نبذة تعريفية</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>صورة المعلم</Label>
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
