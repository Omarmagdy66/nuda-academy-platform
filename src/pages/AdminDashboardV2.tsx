
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
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, MoreHorizontal, Users, DollarSign, BarChart } from "lucide-react"

// Placeholder Data (In a real app, this would come from your API)
const packagesData = [
  { id: 1, name: "باقة البركة", price: "150 ريال/شهرياً", status: "نشط" },
  { id: 2, name: "باقة الإتقان", price: "220 ريال/شهرياً", status: "نشط" },
  { id: 3, name: "باقة الهمة", price: "300 ريال/شهرياً", status: "غير نشط" },
];

const faqsData = [
  { id: 1, question: "هل الحلقات فردية؟", answer: "نعم، جميع الحلقات فردية..." },
  { id: 2, question: "ما هي طرق الدفع المتاحة؟", answer: "نوفر عدة طرق دفع..." },
];

const AdminDashboardV2 = () => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" dir="rtl">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="packages">إدارة الباقات</TabsTrigger>
          <TabsTrigger value="content">إدارة المحتوى</TabsTrigger>
          <TabsTrigger value="settings">إعدادات الموقع</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,450 ريال</div>
                <p className="text-xs text-muted-foreground">+20.1% من الشهر الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المشتركون</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+230</div>
                <p className="text-xs text-muted-foreground">+10.5% من الشهر الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+120 منذ الأسبوع الماضي</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Packages Tab */}
        <TabsContent value="packages" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>الباقات</CardTitle>
                <CardDescription>إدارة باقات الاشتراك في الأكاديمية.</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    إضافة باقة
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>إضافة باقة جديدة</DialogTitle>
                    <DialogDescription>أدخل تفاصيل الباقة الجديدة هنا.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">الاسم</Label>
                      <Input id="name" defaultValue="باقة التميز" className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">السعر</Label>
                      <Input id="price" defaultValue="400 ريال/شهرياً" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="features" className="text-right">المميزات</Label>
                      <Textarea id="features" placeholder="اكتب كل ميزة في سطر منفصل" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">حفظ</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الباقة</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>
                      <span className="sr-only">الإجراءات</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packagesData.map(pkg => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>{pkg.price}</TableCell>
                      <TableCell>{pkg.status}</TableCell>
                      <TableCell>
                         <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
           <Card>
            <CardHeader>
              <CardTitle>محتوى الموقع</CardTitle>
              <CardDescription>تعديل النصوص والمحتويات الديناميكية في الموقع.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="vision">رؤيتنا</Label>
                <Textarea id="vision" defaultValue="أن نكون الأكاديمية الرائدة عالميًا في تعليم القرآن الكريم عن بعد..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission">رسالتنا</Label>
                <Textarea id="mission" defaultValue="تيسير تعلم وفهم القرآن الكريم للمسلمين في جميع أنحاء العالم..." />
              </div>
              <Button>حفظ التغييرات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
           <Card>
            <CardHeader>
              <CardTitle>إعدادات الموقع العامة</CardTitle>
              <CardDescription>تغيير معلومات التواصل والإعدادات الأساسية.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني للتواصل</Label>
                <Input id="email" type="email" defaultValue="info@nooralhuda.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">رقم الواتساب</Label>
                <Input id="whatsapp" defaultValue="+966501234567" />
              </div>
              <Button>حفظ الإعدادات</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
      </Tabs>
    </div>
  )
}

export default AdminDashboardV2;
