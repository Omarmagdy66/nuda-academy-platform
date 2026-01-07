import { Button } from "@/components/ui/button";
import { Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Or any other token key
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/admin/profile");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
      <div>
        {/* Can add breadcrumbs or page title here */}
        <h1 className="text-lg font-semibold">لوحة التحكم</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleProfileClick}>
          <User className="h-5 w-5" />
        </Button>
        <Button variant="destructive" size="sm" onClick={handleLogout}>
          <LogOut className="h-5 w-5 ml-2" />
          تسجيل الخروج
        </Button>
      </div>
    </header>
  );
};
