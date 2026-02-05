
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";
// import { motion } from "framer-motion";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
// import ar from 'react-phone-number-input/locale/ar';
// import '../phone-input.css';

// const API_BASE_URL = "/api";

// // --- Define Types ---
// interface Package {
//   id: number;
//   name: string;
//   isActive: boolean; // Required for filtering
// }

// // --- API function to fetch active packages ---
// const fetchActivePackages = async (): Promise<Package[]> => {
//   const response = await fetch("https://tibyanacademy.runasp.net/api/Packages/GetAllPackages");
//   if (!response.ok) {
//     throw new Error("Failed to fetch packages.");
//   }
//   const allPackages: Package[] = await response.json();
//   return allPackages.filter(pkg => pkg.isActive);
// }

// const submitTrialRequest = async (data: TrialFormValues) => {
//     const response = await fetch(`${API_BASE_URL}/TrialSession/CreateTrialSession`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "فشل إرسال الطلب. الرجاء المحاولة مرة أخرى.");
//     }
//     return response.json();
// };


// // --- Zod Schema ---
// const formSchema = z.object({
//   name: z.string().min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل." }),
//   age: z.coerce.number().min(5, { message: "العمر يجب أن يكون 5 سنوات على الأقل." }).max(100, { message: "العمر المحدد غير واقعي." }),
//   country: z.string().min(2, { message: "يرجى إدخال اسم الدولة." }),
//   gender: z.enum(["Male", "Female"], { required_error: "يرجى تحديد الجنس." }),
//   packageId: z.coerce.number({ required_error: "يرجى اختيار باقة." }).positive("يرجى اختيار باقة."),
//   phone: z.string().refine(value => isPossiblePhoneNumber(value || ''), { message: "رقم الجوال المدخل غير صالح." }),
//   notes: z.string().optional(),
// })
// type TrialFormValues = z.infer<typeof formSchema>;


// const RegisterPage = () => {
//   const { toast } = useToast();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showSuccess, setShowSuccess] = useState(false);

//   // --- React Query: Fetch Packages ---
//   const { data: packages, isLoading: isLoadingPackages, error: packagesError } = useQuery<Package[], Error>({
//     queryKey: ['activePackages'],
//     queryFn: fetchActivePackages,
//     // Added retry: false to prevent loops on auth errors or specific API issues.
//     retry: false,
//   });

//   // --- React Query: Submit Form ---
//   const mutation = useMutation({
//     mutationFn: submitTrialRequest,
//     onSuccess: () => {
//       setShowSuccess(true);
//       setTimeout(() => navigate("/"), 5000);
//     },
//     onError: (error: Error) => {
//        toast({ title: "حدث خطأ في الإرسال", description: error.message, variant: "destructive" });
//     }
//   });

//   // --- React Hook Form ---
//   const form = useForm<TrialFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       phone: "",
//       country: "",
//       notes: "",
//       gender: undefined,
//       packageId: undefined,
//     },
//   });

//   // --- Effect to set package from URL ---
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const packageIdFromUrl = searchParams.get('packageId');
//     if (packageIdFromUrl && packages) {
//         const selectedPackageId = parseInt(packageIdFromUrl, 10);
//         if (packages.some(p => p.id === selectedPackageId)) {
//             form.setValue('packageId', selectedPackageId, { shouldValidate: true });
//         }
//     }
//   }, [packages, location.search, form]);

//   function onSubmit(values: TrialFormValues) {
//     mutation.mutate(values);
//   }
  
//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   };

//   // --- Success Screen ---
//   if (showSuccess) {
//     return (
//         <motion.div
//             className="container flex items-center justify-center min-h-[80vh] text-center"
//             initial="hidden" animate="visible" variants={containerVariants}
//         >
//             <Card className="w-full max-w-lg shadow-2xl">
//                 <CardHeader>
//                     <CardTitle className="text-3xl font-bold text-green-600">تم الإرسال بنجاح!</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <p className="text-lg">شكراً لتسجيلك. لقد استلمنا طلبك للحصة التجريبية.</p>
//                     <p className="mt-2 text-muted-foreground">سيتواصل معك أحد ممثلينا قريباً على رقم الجوال الذي زودتنا به.</p>
//                     <p className="mt-6 text-sm text-gray-500">سيتم تحويلك إلى الصفحة الرئيسية خلال 5 ثوانٍ...</p>
//                 </CardContent>
//             </Card>
//         </motion.div>
//     );
//   }

//   // --- Main Form ---
//   return (
//     <motion.div 
//         className="container py-12 md:py-20"
//         initial="hidden" animate="visible" variants={containerVariants}
//     >
//       <Card className="max-w-2xl mx-auto shadow-lg">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold">طلب حصة تجريبية مجانية</CardTitle>
//           <p className="text-muted-foreground pt-2">
//             املأ النموذج أدناه وسنتواصل معك لترتيب حصتك التجريبية في أقرب وقت.
//           </p>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>الاسم الكامل</FormLabel>
//                     <FormControl>
//                       <Input placeholder="مثال: عبد الله بن محمد" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormField
//                   control={form.control}
//                   name="age"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>العمر</FormLabel>
//                       <FormControl>
//                         <Input type="number" placeholder="مثال: 25" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="country"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>الدولة</FormLabel>
//                       <FormControl>
//                         <Input placeholder="مثال: المملكة العربية السعودية" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
              
//               <FormField
//                   control={form.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                         <FormLabel>رقم الجوال (واتساب)</FormLabel>
//                         <FormControl>
//                             <PhoneInput
//                                 {...field}
//                                 id="phone"
//                                 placeholder="أدخل رقم الجوال"
//                                 international
//                                 labels={ar}
//                                 defaultCountry="EG"
//                             />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                   )}
//               />

//               <FormField
//                 control={form.control}
//                 name="gender"
//                 render={({ field }) => (
//                   <FormItem className="space-y-3">
//                     <FormLabel>الجنس</FormLabel>
//                     <FormControl>
//                       <RadioGroup
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                         className="flex items-center space-x-4"
//                       >
//                         <FormItem className="flex items-center space-x-2 space-x-reverse">
//                           <FormControl>
//                             <RadioGroupItem value="Male" />
//                           </FormControl>
//                           <FormLabel className="font-normal">ذكر</FormLabel>
//                         </FormItem>
//                         <FormItem className="flex items-center space-x-2 space-x-reverse">
//                           <FormControl>
//                             <RadioGroupItem value="Female" />
//                           </FormControl>
//                           <FormLabel className="font-normal">أنثى</FormLabel>
//                         </FormItem>
//                       </RadioGroup>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="packageId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>اختر الباقة</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value ? String(field.value) : ""}>
//                       <FormControl>
//                         <SelectTrigger disabled={isLoadingPackages || !!packagesError}>
//                           <SelectValue placeholder={
//                             isLoadingPackages ? "جاري تحميل الباقات..." : 
//                             packagesError ? "فشل تحميل الباقات" : 
//                             "اختر الباقة المناسبة"
//                           } />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {packages?.map(pkg => (
//                           <SelectItem key={pkg.id} value={String(pkg.id)}>
//                             {pkg.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
              
//               <FormField
//                 control={form.control}
//                 name="notes"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>ملاحظات (اختياري)</FormLabel>
//                     <FormControl>
//                       <Textarea placeholder="أي معلومات إضافية تود إخبارنا بها..." {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button type="submit" className="w-full text-lg py-6" disabled={mutation.isPending || isLoadingPackages}>
//                 {mutation.isPending ? (
//                   <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري الإرسال...</>
//                 ) : (
//                   "إرسال الطلب"
//                 )}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

// export default RegisterPage;



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
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import ar from 'react-phone-number-input/locale/ar';
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import '../phone-input.css';

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
                        <FormLabel>رقم الجوال (واتساب)</FormLabel>
                        <FormControl>
                            <PhoneInput
                                {...field}
                                id="phone"
                                placeholder="أدخل رقم الجوال"
                                international
                                labels={ar}
                                defaultCountry="EG"
                            />
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