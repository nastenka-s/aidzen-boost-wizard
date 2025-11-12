import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Solar from "./pages/Solar";
import FormulaDushi from "./pages/FormulaDushi";
import Synastry from "./pages/Synastry";
import NatalChart from "./pages/NatalChart";
import DataProcessingPolicy from "./pages/DataProcessingPolicy";
import PublicOffer from "./pages/PublicOffer";
import DataProcessing from "./pages/DataProcessing";
import Blog from "./pages/Blog";
import FormulaEvents from "./pages/FormulaEvents";
import ChisloSudby from "./pages/ChisloSudby";
import SovmestimostDolgih from "./pages/SovmestimostDolgih";
import PоказателиDeneg from "./pages/PоказателиDeneg";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pokazateli-deneg-i-bogatstva-v-matrice-sudby" element={<PоказателиDeneg />} />
          <Route path="/sovmestimost-dlya-dolgih-otnosheniy" element={<SovmestimostDolgih />} />
          <Route path="/chislo-sudby-kak-primenit" element={<ChisloSudby />} />
          <Route path="/formulaevents" element={<FormulaEvents />} />
          <Route path="/solar" element={<Solar />} />
          <Route path="/formuladushi" element={<FormulaDushi />} />
          <Route path="/synastry" element={<Synastry />} />
          <Route path="/natalchart" element={<NatalChart />} />
          <Route path="/dataprocessingpolicy" element={<DataProcessingPolicy />} />
          <Route path="/publicoffer" element={<PublicOffer />} />
          <Route path="/dataprocessing" element={<DataProcessing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
