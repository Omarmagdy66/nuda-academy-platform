
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

const API_BASE_URL = "https://tibyanacademy.runasp.net/api";

// --- Type Definitions ---
interface PackageCategory {
  id: number;
  name: string;
  order: number;
}

interface Package {
  id: number;
  name: string;
  description?: string;
  price: number;
  features: string[];
  isActive: boolean;
  packageCategoryId: number | null;
}

// --- API Fetching Functions ---
const fetchActivePackages = async (): Promise<Package[]> => {
  const response = await fetch(`${API_BASE_URL}/Packages/GetAllPackages`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch packages: ${errorText}`);
  }
  const allPackages: Package[] = await response.json();
  return allPackages.filter(pkg => pkg.isActive);
};

const fetchPackageCategories = async (): Promise<PackageCategory[]> => {
  const response = await fetch(`${API_BASE_URL}/PackageCategory/GetAllPackageCategories`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch package categories: ${errorText}`);
  }
  return response.json();
};

const PackagesPage = () => {
  const [packagesQuery, categoriesQuery] = useQueries({
    queries: [
      { queryKey: ['allActivePackages'], queryFn: fetchActivePackages },
      { queryKey: ['allPackageCategories'], queryFn: fetchPackageCategories },
    ],
  });

  const { data: packages, isLoading: isLoadingPackages, error: errorPackages } = packagesQuery;
  const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = categoriesQuery;

  const isLoading = isLoadingPackages || isLoadingCategories;
  const error = errorPackages || errorCategories;

  const groupedPackages = useMemo(() => {
    if (!packages || !categories) return null;

    const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
    const categoryMap = new Map(sortedCategories.map(cat => [cat.id, cat.name]));
    
    const grouped: { [key: string]: Package[] } = {};

    packages.forEach(pkg => {
      const categoryName = pkg.packageCategoryId ? categoryMap.get(pkg.packageCategoryId) || "باقات متنوعة" : "باقات متنوعة";
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(pkg);
    });
    
    const orderedGrouped: { [key: string]: Package[] } = {};
    sortedCategories.forEach(cat => {
        if (grouped[cat.name]) {
            orderedGrouped[cat.name] = grouped[cat.name];
        }
    });

    if (grouped["باقات متنوعة"]) {
        orderedGrouped["باقات متنوعة"] = grouped["باقات متنوعة"];
    }

    return orderedGrouped;

  }, [packages, categories]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  if (isLoading) {
    return (
      <div className="container py-20 flex justify-center items-center h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20 text-center h-[60vh]">
        <h2 className="text-2xl font-bold text-destructive">حدث خطأ</h2>
        <p className="text-muted-foreground mt-2">لم نتمكن من جلب البيانات اللازمة. الرجاء المحاولة مرة أخرى لاحقاً.</p>
        <p className="mt-4 text-sm text-red-500 font-mono break-all">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="container py-20 min-h-[80vh]">
      <div className="text-center mb-16">
        <motion.h1 initial={{y: -30, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.5}} className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          اختر الباقة التي تناسبك
        </motion.h1>
        <motion.p initial={{y: -30, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.5, delay: 0.2}} className="max-w-2xl mx-auto text-lg text-muted-foreground">
          نقدم باقات متنوعة مصممة لتلبية احتياجاتك التعليمية وميزانيتك.
        </motion.p>
      </div>

      {groupedPackages && Object.keys(groupedPackages).length > 0 ? (
        Object.entries(groupedPackages).map(([categoryName, packagesInCategory]) => (
          <motion.section 
            key={categoryName} 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center md:text-right">{categoryName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {packagesInCategory.map(pkg => (
                <motion.div variants={itemVariants} key={pkg.id}>
                  <Card className="h-full flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      {pkg.description && (
                        <p className="text-sm text-muted-foreground pt-2 min-h-[40px]">{pkg.description}</p>
                      )}
                      <div className="text-4xl font-bold py-4">${pkg.price} <span className="text-lg font-normal text-muted-foreground">/شهرياً</span></div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow px-6 pb-6">
                      <ul className="space-y-4 mb-8 flex-grow text-right">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
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
            </div>
          </motion.section>
        ))
      ) : (
        <div className="text-center col-span-full py-12">
          <h3 className="text-xl font-semibold">لا توجد باقات متاحة حالياً</h3>
          <p className="text-muted-foreground mt-2">يرجى العودة لاحقاً أو التواصل معنا لمزيد من المعلومات.</p>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;
