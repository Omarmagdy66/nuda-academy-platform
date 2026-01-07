import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle"; // Import the ThemeToggle component

const API_BASE_URL = "https://tibyanacademy.runasp.net";

const AdminProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/User/GetMyProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
          setName(data.name);
          setEmail(data.email);
        } else {
          throw new Error("فشل في جلب بيانات الملف الشخصي");
        }
      } catch (error) {
        toast({
          title: "خطأ",
          description: error instanceof Error ? error.message : "حدث خطأ غير معروف أثناء جلب بيانات الملف الشخصي",
          variant: "destructive",
        });
      }
    };
    fetchUserProfile();
  }, [navigate, toast]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const updatePayload = {
      name: name || currentUser.name,
      email: email || currentUser.email,
      passwordHash: password || undefined,
    };

    if (!updatePayload.name && !updatePayload.email && !updatePayload.passwordHash) {
      toast({
        title: "خطأ",
        description: "يجب إدخال الاسم أو البريد الإلكتروني أو كلمة المرور على الأقل.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/User/UpdateUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setCurrentUser(updatedData);
        setName(updatedData.name);
        setEmail(updatedData.email);
        toast({
          title: "نجاح",
          description: "تم تحديث بياناتك بنجاح.",
        });
        if (password) {
          setPassword("");
        }
      } else {
        console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
        let errorMessage = `فشل تحديث الملف الشخصي. (${response.status} ${response.statusText})`;
        try {
          const errorJson = await response.json();
          if (errorJson.errors) {
            errorMessage += "\n" + Object.values(errorJson.errors).flat().join("\n");
          } else if (errorJson.message) {
            errorMessage += "\n" + errorJson.message;
          } else if (typeof errorJson === 'string'){
            errorMessage += "\n" + errorJson;
          }
        } catch (jsonError) {
          const errorText = await response.text();
          if (errorText) {
            errorMessage += "\n" + errorText;
          }
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ غير معروف أثناء تحديث الملف الشخصي",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!window.confirm("هل أنت متأكد أنك تريد حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء.")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/User/DeleteUser`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: "نجاح",
          description: "تم حذف الحساب بنجاح. سيتم تسجيل خروجك الآن.",
        });
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "فشل حذف الحساب");
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ غير معروف أثناء حذف الحساب",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الملف الشخصي</h1>
        <ThemeToggle />
      </div>
      
      <form onSubmit={handleUpdate} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">تحديث المعلومات</h2>
        <p className="text-sm text-gray-500 mb-4">
          املأ الحقول التي ترغب في تحديثها فقط.
        </p>
        
        <div>
          <label htmlFor="name">الاسم</label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="الاسم الجديد"
          />
        </div>
        
        <div>
          <label htmlFor="email">البريد الإلكتروني</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني الجديد"
          />
        </div>

        <div>
          <label htmlFor="password">كلمة المرور</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة مرور جديدة (اتركه فارغًا لعدم التغيير)"
          />
        </div>

        <Button type="submit">تحديث الملف الشخصي</Button>
      </form>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">إجراءات خطيرة</h2>
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex justify-between items-center">
            <div>
                <h3 className="font-bold">حذف الحساب</h3>
                <p className="text-sm text-red-700">
                سيؤدي هذا إلى حذف حسابك نهائيًا. لا يمكن التراجع عن هذا الإجراء.
                </p>
            </div>
            <Button variant="destructive" onClick={handleDelete}>
                احذف حسابي
            </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
