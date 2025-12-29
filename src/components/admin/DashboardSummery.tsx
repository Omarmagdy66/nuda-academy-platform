
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpenCheck, DollarSign, UserCheck } from "lucide-react";

// Mock Data
const summaryData = {
    totalStudents: 125,
    activeSubscriptions: 110,
    totalTeachers: 15,
    monthlyRevenue: 12500
};

export const DashboardSummery = () => {
  const { totalStudents, activeSubscriptions, totalTeachers, monthlyRevenue } = summaryData;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الطلاب</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-muted-foreground">+10% عن الشهر الماضي</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الاشتراكات النشطة</CardTitle>
          <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeSubscriptions}</div>
          <p className="text-xs text-muted-foreground">+5% هذا الشهر</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي المعلمين</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTeachers}</div>
          <p className="text-xs text-muted-foreground">+1 هذا الشهر</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الإيرادات الشهرية</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{monthlyRevenue.toLocaleString('ar-SA')} ر.س</div>
          <p className="text-xs text-muted-foreground">+12% عن الشهر الماضي</p>
        </CardContent>
      </Card>
    </div>
  );
};
