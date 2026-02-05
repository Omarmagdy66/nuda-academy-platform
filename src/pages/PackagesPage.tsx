
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// --- Define the Package interface ---
interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
  isFeatured: boolean;
}

const PackagesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/Packages/GetAllPackages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data: Package[] = await response.json();
        setPackages(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

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

    if (loading) {
        return <div className="container py-20 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="container py-20 text-center text-red-500">Error: {error}</div>;
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
        {packages.map(pkg => (
          <motion.div variants={itemVariants} key={pkg.id}>
            <Card className={`h-full flex flex-col ${pkg.isFeatured ? "border-primary shadow-lg" : ""}`}>
              {pkg.isFeatured && <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">الأكثر شيوعاً</Badge>}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <div className="text-4xl font-bold my-4">{pkg.price} <span className="text-lg font-normal text-muted-foreground">ر.س/شهرياً</span></div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full mt-auto text-lg py-6" variant={pkg.isFeatured ? "default" : "outline"}>
                  <Link to="/register">اشترك الآن</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PackagesPage;
