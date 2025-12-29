
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

// --- Define Package Type ---
interface Package {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
}

// --- API function to fetch active packages ---
const fetchActivePackages = async (): Promise<Package[]> => {
  const response = await fetch("https://tibyanacademy.runasp.net/api/Packages/GetAllPackages");
  if (!response.ok) {
    throw new Error("Failed to fetch packages.");
  }
  const allPackages: Package[] = await response.json();
  return allPackages.filter(pkg => pkg.isActive);
}

// --- Zod Schema for the form ---
const formSchema = z.object({
  name: z.string().min(2, { message: "يجب أن يتكون الاسم من حرفين على الأقل." }),
  phone: z.string().min(9, { message: "الرجاء إدخال رقم هاتف صحيح." }),
  age: z.coerce.number().min(5, { message: "يجب أن يكون العمر 5 سنوات أو أكثر." }).max(100, { message: "العمر غير واقعي." }),
  country: z.string().min(2, { message: "الرجاء إدخال اسم الدولة." }),
  gender: z.enum(["male", "female"], { required_error: "الرجاء تحديد الجنس." }),
  packageId: z.coerce.number({ required_error: "الرجاء اختيار باقة." }).min(1, "الرجاء اختيار باقة."),
  notes: z.string().optional(),
})
type RegistrationFormValues = z.infer<typeof formSchema>;

// --- API call function to submit the form ---
const submitRegistration = async (data: RegistrationFormValues) => {
  const payload = {
    Name: data.name,
    Age: data.age,
    Phone: data.phone,
    Notes: data.notes || "",
    Country: data.country,
    gender: data.gender, 
    PackageId: data.packageId,
  };

  const response = await fetch("https://tibyanacademy.runasp.net/api/Applications/CreateApplication", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "فشل إرسال الطلب. الرجاء المحاولة مرة أخرى.");
  }

  return response.text();
};

const Register = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  // --- Fetch active packages using React Query ---
  const { data: packages, isLoading: isLoadingPackages, error: packagesError } = useQuery<Package[], Error>({
    queryKey: ['activePackages'],
    queryFn: fetchActivePackages,
  });

  const mutation = useMutation({
    mutationFn: submitRegistration,
    onSuccess: () => {
      toast({ title: "تم الإرسال بنجاح!", description: "شكراً لتسجيلك. سنتواصل معك قريباً." });
      form.reset();
    },
    onError: (error: Error) => {
       toast({ title: "حدث خطأ", description: error.message, variant: "destructive" });
    }
  });

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      country: "",
      notes: "",
      packageId: undefined,
    },
  })

  // --- Effect to set package from URL ---
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const packageIdFromUrl = searchParams.get('packageId');
    
    if (packageIdFromUrl && packages) {
        const selectedPackageId = parseInt(packageIdFromUrl, 10);
        const packageExists = packages.some(p => p.id === selectedPackageId);
        
        if (packageExists) {
            form.setValue('packageId', selectedPackageId, { shouldValidate: true });
        }
    }
}, [packages, location.search, form]);


  function onSubmit(values: RegistrationFormValues) {
    mutation.mutate(values);
  }

  return (
    <motion.div
      className="container py-12 lg:py-20 flex items-center justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">نموذج التسجيل في الأكاديمية</CardTitle>
          <CardDescription>املأ النموذج أدناه للانضمام إلى إحدى باقاتنا التعليمية.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* ... Other form fields remain the same ... */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل للطالب</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: عبد الله بن محمد" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عمر الطالب</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="مثال: 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الجنس</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الجنس" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">ذكر</SelectItem>
                          <SelectItem value="female">أنثى</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الدولة</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: السعودية" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الجوال للتواصل (WhatsApp)</FormLabel>
                      <FormControl>
                        <Input placeholder="+9665xxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="packageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اختر الباقة</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value ? String(field.value) : ""}>
                        <FormControl>
                          <SelectTrigger disabled={isLoadingPackages || !packages}>
                            <SelectValue placeholder={isLoadingPackages ? "جاري تحميل الباقات..." : "اختر الباقة المناسبة"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {packagesError ? (
                            <SelectItem value="error" disabled>فشل تحميل الباقات</SelectItem>
                          ) : (
                            packages?.map(pkg => (
                              <SelectItem key={pkg.id} value={String(pkg.id)}>
                                {pkg.name} - ${pkg.price}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملاحظات إضافية</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="هل لديك أي استفسارات أو تفضيلات معينة؟ (اختياري)"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-lg py-6" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري الإرسال...</>
                ) : (
                  "إرسال الطلب"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Register
