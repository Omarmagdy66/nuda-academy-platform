
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle"; // Import the ThemeToggle component

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
        <h1 className="text-lg font-semibold">لوحة التحكم</h1>
      </div>
      <div className="flex items-center gap-2"> {/* Reduced gap for better alignment */}
        
        {/* Theme Toggle Button */}
        <ThemeToggle />

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" onClick={handleProfileClick}>
          <User className="h-5 w-5" />
        </Button>
        
        <div className="border-l h-6 mx-2"></div> {/* Separator */}

        <Button variant="destructive" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 ml-2" />
          <span>تسجيل الخروج</span>
        </Button>
      </div>
    </header>
  );
};
