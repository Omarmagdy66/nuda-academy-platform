
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

// --- API Base URL ---
const API_BASE_URL = "https://tibyanacademy.runasp.net";

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string; // Comma-separated string
  isMostPopular: boolean;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Package[]>(`${API_BASE_URL}/api/packages`);
        setPackages(response.data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <motion.section
        className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
        initial="hidden" animate="visible" variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">باقاتنا التعليمية</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            اختر الباقة التي تناسب أهدافك وميزانيتك، وابدأ رحلتك في حفظ وتلاوة القرآن الكريم معنا.
          </p>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        className="py-20"
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" variants={sectionVariants}>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="flex flex-col">
                  <CardHeader className="text-center pb-6">
                    <Skeleton className="h-7 w-1/2 mx-auto mb-2" />
                    <Skeleton className="h-4 w-3/4 mx-auto mb-4" />
                    <Skeleton className="h-8 w-1/3 mx-auto" />
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Skeleton className="h-12 w-full" />
                  </div>
                </Card>
              ))
            ) : (
              packages.map(pkg => (
                <motion.div variants={itemVariants} key={pkg.id} className="h-full">
                  <Card className={`h-full flex flex-col ${pkg.isMostPopular ? 'border-2 border-primary' : ''} relative`}>
                    {pkg.isMostPopular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">الأكثر شيوعاً</Badge>
                    )}
                    <CardHeader className="text-center pb-6">
                      <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                      <div className="text-4xl font-bold mt-4">{pkg.price} <span className="text-lg font-medium text-muted-foreground">ر.س/شهرياً</span></div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-4 text-muted-foreground">
                        {pkg.features.split(',').map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            <span>{feature.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                      <Button asChild className="w-full text-lg mt-6" variant={pkg.isMostPopular ? 'default' : 'outline'}>
                        <Link to="/register">اختر الباقة</Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Packages;
