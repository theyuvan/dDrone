import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import TestPage from "./pages/TestPage";
import OrderDetails from "./pages/OrderDetails";
import CreateOrder from "./pages/CreateOrder";
import ConfirmOrder from "./pages/ConfirmOrder";
import Wallet from "./pages/Wallet";
import PackageTracker from "./pages/PackageTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/test" element={<TestPage />} />
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/create-order" element={<CreateOrder />} />
              <Route path="/confirm-order" element={<ConfirmOrder />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/track/:id" element={<PackageTracker />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;