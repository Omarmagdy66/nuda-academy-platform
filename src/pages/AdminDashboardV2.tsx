
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  DollarSign, 
  Users, 
  BarChart, 
  ClipboardList, 
  BookOpen, 
  FileText, 
  Settings
} from "lucide-react"

// Import the new manager components
import { TeachersManager } from "@/components/admin/TeachersManager";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";
import { PackagesManager } from "@/components/admin/PackagesManager";
import { FaqsManager } from "@/components/admin/FaqsManager"; 
import { ApplicationsViewer } from "@/components/admin/ApplicationsViewer";
import { SiteContentEditor } from "@/components/admin/SiteContentEditor";

const AdminDashboardV2 = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" dir="rtl">
        <TabsList className="grid w-full grid-cols-2 h-auto md:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="overview"><BarChart className="ml-2 h-4 w-4"/>نظرة عامة</TabsTrigger>
          <TabsTrigger value="applications"><ClipboardList className="ml-2 h-4 w-4"/>طلبات التسجيل</TabsTrigger>
          <TabsTrigger value="teachers"><Users className="ml-2 h-4 w-4"/>المعلمون</TabsTrigger>
          <TabsTrigger value="testimonials"><BookOpen className="ml-2 h-4 w-4"/>آراء الطلاب</TabsTrigger>
          <TabsTrigger value="packages"><DollarSign className="ml-2 h-4 w-4"/>الباقات</TabsTrigger>
          <TabsTrigger value="faqs"><FileText className="ml-2 h-4 w-4"/>الأسئلة الشائعة</TabsTrigger>
          <TabsTrigger value="content"><Settings className="ml-2 h-4 w-4"/>محتوى الموقع</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
           <Card>
             <CardHeader>
                <CardTitle>مرحباً بك في لوحة التحكم</CardTitle>
                <CardDescription>من هنا يمكنك إدارة جميع جوانب موقع الأكاديمية.</CardDescription>
             </CardHeader>
             <CardContent>
                <p>استخدم علامات التبويب أعلاه للتنقل بين الأقسام المختلفة.</p>
             </CardContent>
           </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
            <ApplicationsViewer />
        </TabsContent>

        {/* Teachers Management Tab */}
        <TabsContent value="teachers" className="space-y-4">
          <TeachersManager />
        </TabsContent>

        {/* Testimonials Management Tab */}
        <TabsContent value="testimonials" className="space-y-4">
          <TestimonialsManager />
        </TabsContent>

        {/* Packages Tab */}
        <TabsContent value="packages" className="space-y-4">
          <PackagesManager />
        </TabsContent>
        
        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-4">
           <FaqsManager />
        </TabsContent>

        {/* Content Editor Tab */}
        <TabsContent value="content" className="space-y-4">
           <SiteContentEditor />
        </TabsContent>
        
      </Tabs>
    </div>
  )
}

export default AdminDashboardV2;
