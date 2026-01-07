import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
// Reverting to aliased paths as the config should now be correct
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <AdminHeader />
        <main className="p-4 md:p-8 lg:p-12">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminDashboard;
