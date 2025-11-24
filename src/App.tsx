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
import NatalChartCalculator from "./pages/NatalChartCalculator";
import DataProcessingPolicy from "./pages/DataProcessingPolicy";
import PublicOffer from "./pages/PublicOffer";
import DataProcessing from "./pages/DataProcessing";
import Blog from "./pages/Blog";
import FormulaEvents from "./pages/FormulaEvents";
import ChisloSudby from "./pages/ChisloSudby";
import SovmestimostDolgih from "./pages/SovmestimostDolgih";
import PоказателиDeneg from "./pages/PоказателиDeneg";
import ChisloDoma from "./pages/ChisloDoma";
import Tranzity from "./pages/Tranzity";
import AstrologicalEvents2026 from "./pages/AstrologicalEvents2026";
import DivorceInAstrology from "./pages/DivorceInAstrology";
import TalentsInHoroscope from "./pages/TalentsInHoroscope";
import DecemberEvents2025 from "./pages/DecemberEvents2025";
import NovyjGod2026 from "./pages/NovyjGod2026";
import SeventhHouse from "./pages/SeventhHouse";
import MatrixSudby from "./pages/MatrixSudby";
import MatrixSudby22Arkana from "./pages/MatrixSudby22Arkana";
import DetiVNatalnoyKarte from "./pages/DetiVNatalnoyKarte";
import PervyiDomGoroskopa from "./pages/PervyiDomGoroskopa";
import VtoroyDomNatalnayKarta from "./pages/VtoroyDomNatalnayKarta";

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
          <Route path="/2-dom-v-natalnoy-karte-aspekty-tranzity" element={<VtoroyDomNatalnayKarta />} />
          <Route path="/pervyi-dom-goroskopa-upravitel-aspekty" element={<PervyiDomGoroskopa />} />
          <Route path="/deti-v-natalnoy-karte-kogda-i-skolko" element={<DetiVNatalnoyKarte />} />
          <Route path="/matrica-sudby-22-arkana-besplatno" element={<MatrixSudby22Arkana />} />
          <Route path="/7-dom-v-natalnoj-karte-otnosheniya-i-razryvy" element={<SeventhHouse />} />
          <Route path="/matrica-sudby-rasschitat" element={<MatrixSudby />} />
          <Route path="/talanty-v-goroskope-tehnar-ili-gumanitarij" element={<TalentsInHoroscope />} />
          <Route path="/klyuchevye-astrologicheskie-sobytiya-2026" element={<AstrologicalEvents2026 />} />
          <Route path="/novyj-god-2026-v-chem-vstrechat-po-znaku-zodiaka" element={<NovyjGod2026 />} />
          <Route path="/klyuchevye-astrologicheskie-sobytiya-dekabrya-2025" element={<DecemberEvents2025 />} />
          <Route path="/razvody-v-astrologii-gde-iskat" element={<DivorceInAstrology />} />
          <Route path="/tranzity-k-natalnoj-karte-i-ih-vliyanie" element={<Tranzity />} />
          <Route path="/chislo-doma-i-kvartiry-vliyanie-na-dengi-i-son" element={<ChisloDoma />} />
          <Route path="/pokazateli-deneg-i-bogatstva-v-matrice-sudby" element={<PоказателиDeneg />} />
          <Route path="/sovmestimost-dlya-dolgih-otnosheniy" element={<SovmestimostDolgih />} />
          <Route path="/chislo-sudby-kak-primenit" element={<ChisloSudby />} />
          <Route path="/formulaevents" element={<FormulaEvents />} />
          <Route path="/solar" element={<Solar />} />
          <Route path="/formuladushi" element={<FormulaDushi />} />
          <Route path="/synastry" element={<Synastry />} />
          <Route path="/natalchart" element={<NatalChart />} />
          <Route path="/natal-chart-calculator" element={<NatalChartCalculator />} />
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
