
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Register from "./pages/Register"; // Kept for future use
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// --- Updated Imports ---
import LoginPage from "./pages/LoginPage"; // Our new login page
import AdminDashboardV2 from "./pages/AdminDashboardV2";
import ProtectedRoute from "./components/ProtectedRoute"; // Our new protected route component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="sanad-alqurra-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          {/* Layout is used for public-facing pages with Navbar and Footer */}
          <Routes>
            {/* --- Public Routes --- */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* --- Auth Route (doesn't use the main layout) --- */}
            <Route path="/login" element={<LoginPage />} />

            {/* --- Protected Admin Route --- */}
            <Route path="/admin" element={<ProtectedRoute />}>
               {/* This route will only be accessible if the user is logged in */}
               <Route index element={<AdminDashboardV2 />} />
            </Route>

            {/* --- Not Found Route --- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
