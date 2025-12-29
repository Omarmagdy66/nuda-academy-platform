
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"

// --- Define Package Type ---
interface Package {
  id: number;
  name: string;
  price: number;
  features: string[];
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

const Packages = () => {
  const { data: packages, isLoading, error } = useQuery<Package[], Error>({
    queryKey: ['activePackages'],
    queryFn: fetchActivePackages,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  if (isLoading) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold text-destructive">حدث خطأ</h2>
        <p className="text-muted-foreground">لم نتمكن من جلب الباقات. الرجاء المحاولة مرة أخرى لاحقاً.</p>
      </div>
    )
  }

  return (
    <div className="container py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          اختر الباقة التي تناسبك
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          نقدم باقات متنوعة مصممة لتلبية احتياجاتك التعليمية وميزانيتك.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {packages?.map(pkg => (
          <motion.div variants={itemVariants} key={pkg.id}>
            <Card className={`relative h-full flex flex-col`}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <div className="text-4xl font-bold my-4">${pkg.price} <span className="text-lg font-normal text-muted-foreground">/شهرياً</span></div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  {/* Assuming features is an array of strings from the API */}
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full mt-auto text-lg py-6">
                  <Link to={`/register?packageId=${pkg.id}`}>اشترك الآن</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

       {packages && packages.length === 0 && (
          <div className="text-center col-span-full py-12">
              <h3 className="text-xl font-semibold">لا توجد باقات متاحة حالياً</h3>
              <p className="text-muted-foreground mt-2">يرجى العودة لاحقاً أو التواصل معنا لمزيد من المعلومات.</p>
          </div>
        )}

    </div>
  );
};

export default Packages;
