import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, Users, FileText, BarChart, BookOpen, User as UserIcon, FolderTree } from "lucide-react";

const navItems = [
  { to: "overview", icon: Home, label: "نظرة عامة" },
  { to: "requests", icon: FileText, label: "طلبات التسجيل" },
  { to: "packages", icon: ShoppingCart, label: "الباقات" },
  { to: "package-categories", icon: FolderTree, label: "فئات الباقات" },
  { to: "teachers", icon: Users, label: "المعلمين" },
  { to: "feedback", icon: BarChart, label: "آراء الطلاب" },
  { to: "site-content", icon: BookOpen, label: "محتوى الموقع" },
  { to: "profile", icon: UserIcon, label: "الملف الشخصي" },
];

export const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">أكاديمية عاكفين</h1>
      </div>
      <nav className="flex-1 px-4 py-2">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
