import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Register from "./pages/Register";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import { SiteContentEditor } from "./components/admin/SiteContentEditor";
import { PackagesManager } from "./components/admin/PackagesManager";
import { PackageCategoryManager } from "./components/admin/PackageCategoryManager"; // Import the new component
import { TeachersManager } from "./components/admin/TeachersManager";
import { ApplicationsViewer } from "./components/admin/ApplicationsViewer";
import { TestimonialsManager } from "./components/admin/TestimonialsManager";
import { DashboardSummery } from "./components/admin/DashboardSummery";
import AdminProfile from "./pages/AdminProfile"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="sanad-alqurra-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* --- Public Routes --- */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* --- Auth Route --- */}
            <Route path="/login" element={<LoginPage />} />

            {/* --- Protected Admin Routes --- */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminDashboard />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<DashboardSummery />} />
                <Route path="site-content" element={<SiteContentEditor />} />
                <Route path="packages" element={<PackagesManager />} />
                <Route path="package-categories" element={<PackageCategoryManager />} /> {/* Add the new route */}
                <Route path="teachers" element={<TeachersManager />} />
                <Route path="requests" element={<ApplicationsViewer />} />
                <Route path="feedback" element={<TestimonialsManager />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>
            </Route>

            {/* --- Not Found Route --- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <SpeedInsights />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
