import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/scroolToTop";
import Index from "./pages/Index";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/privacy";
import RefundPolicy from "./pages/refund";
import TermsAndConditions from "./pages/terms&condition";
import MediaCoverage from "./pages/mediaCoverage";
import Career from "./pages/careers";
import Tenders from "./pages/Tenders";
import AnnualReportsPage from "./pages/AnnualReports";
import NewsArticle from "./pages/NewsArticle";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
     
      <BrowserRouter>
      <ScrollToTop />
       <Header/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/MediaCoverage" element={<MediaCoverage/>} />
          <Route path="/Career" element={<Career/>} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/NewsArticle/:id" element={<NewsArticle />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/Tenders" element={<Tenders />} />
           <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/AnnualReports" element={<AnnualReportsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer/>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
