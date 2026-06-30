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
import TretiDomGoroskopa from "./pages/TretiDomGoroskopa";
import ChetvertyiDomGoroskopa from "./pages/ChetvertyiDomGoroskopa";
import PyatyiDomGoroskopa from "./pages/PyatyiDomGoroskopa";
import ShestoyDomGoroskopa from "./pages/ShestoyDomGoroskopa";
import SedmoyDomGoroskopa from "./pages/SedmoyDomGoroskopa";
import VosmoyDomGoroskopa from "./pages/VosmoyDomGoroskopa";
import DevyatyiDomGoroskopa from "./pages/DevyatyiDomGoroskopa";
import DesyatyiDomGoroskopa from "./pages/DesyatyiDomGoroskopa";
import OdinnadcatyiDomGoroskopa from "./pages/OdinnadcatyiDomGoroskopa";
import DvenadtsatyiDomGoroskopa from "./pages/DvenadtsatyiDomGoroskopa";
import VeneraVDomahGoroskopa from "./pages/VeneraVDomahGoroskopa";
import MarsVDomahGoroskopa from "./pages/MarsVDomahGoroskopa";
import BogatstvoVNatalnoyKarte from "./pages/BogatstvoVNatalnoyKarte";
import MatricaSudbyDengiKarmaOtnosheniya from "./pages/MatricaSudbyDengiKarmaOtnosheniya";
import BrakiIRazvodyvNatalnoyKarte from "./pages/BrakiIRazvodyvNatalnoyKarte";
import KakVyitiIzMinusaVPlyus from "./pages/KakVyitiIzMinusaVPlyus";
import KakVychislitSvoy4Dom from "./pages/KakVychislitSvoy4Dom";
import Neurozen from "./pages/Neurozen";
import SamorealizaciyaVNatalnoyKarteZhenshchiny from "./pages/SamorealizaciyaVNatalnoyKarteZhenshchiny";
import AstrologicheskayaSovmestimost from "./pages/AstrologicheskayaSovmestimost";
import LunnyjKalendarStrizhek2026 from "./pages/blog-auto/LunnyjKalendarStrizhek2026";
import LilitVNatalnojKarte from "./pages/blog-auto/LilitVNatalnojKarte";
import ChisloGoda2026Numerologiya from "./pages/blog-auto/ChisloGoda2026Numerologiya";
import SevernyjYuzhnyjUzlyNatalnayaKarta from "./pages/blog-auto/SevernyjYuzhnyjUzlyNatalnayaKarta";
import HironVNatalnojKarte from "./pages/blog-auto/HironVNatalnojKarte";
import ProgressiiVAstrologii from "./pages/blog-auto/ProgressiiVAstrologii";
import VozvrashchenieSaturna2930Let from "./pages/blog-auto/VozvrashchenieSaturna2930Let";
import ChisloDushiPoDateRozhdeniya from "./pages/blog-auto/ChisloDushiPoDateRozhdeniya";
import ChisloImeniNumerologiya from "./pages/blog-auto/ChisloImeniNumerologiya";
import KakChitatNatalnuyuKartu from "./pages/blog-auto/KakChitatNatalnuyuKartu";
import KakRasschitatMatricuSudby from "./pages/blog-auto/KakRasschitatMatricuSudby";
import Arkan1MagVMatriceSudby from "./pages/blog-auto/Arkan1MagVMatriceSudby";
import Arkan2ZhricaVMatriceSudby from "./pages/blog-auto/Arkan2ZhricaVMatriceSudby";
import Arkan3ImperatricaVMatriceSudby from "./pages/blog-auto/Arkan3ImperatricaVMatriceSudby";
import OdinakovyeCifryNaChasah from "./pages/blog-auto/OdinakovyeCifryNaChasah";
import KakRasschitatNatalnuyuKartu from "./pages/blog-auto/KakRasschitatNatalnuyuKartu";
import KakUznatChisloSudby from "./pages/blog-auto/KakUznatChisloSudby";
import AngelskayaNumerologiya from "./pages/blog-auto/AngelskayaNumerologiya";
// __AUTOGEN_IMPORTS__ (do not remove — used by generate-blog-post edge function)
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CookieConsent />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          {/* __AUTOGEN_ROUTES__ (do not remove — used by generate-blog-post edge function) */}
          <Route path="/angelskaya-numerologiya" element={<AngelskayaNumerologiya />} />
          <Route path="/kak-uznat-chislo-sudby" element={<KakUznatChisloSudby />} />
          <Route path="/kak-rasschitat-natalnuyu-kartu" element={<KakRasschitatNatalnuyuKartu />} />
          <Route path="/odinakovye-cifry-na-chasah" element={<OdinakovyeCifryNaChasah />} />
          <Route path="/arkan-3-imperatrica-v-matrice-sudby" element={<Arkan3ImperatricaVMatriceSudby />} />
          <Route path="/arkan-2-zhrica-v-matrice-sudby" element={<Arkan2ZhricaVMatriceSudby />} />
          <Route path="/arkan-1-mag-v-matrice-sudby" element={<Arkan1MagVMatriceSudby />} />
          <Route path="/kak-rasschitat-matricu-sudby" element={<KakRasschitatMatricuSudby />} />
          <Route path="/kak-chitat-natalnuyu-kartu" element={<KakChitatNatalnuyuKartu />} />
          <Route path="/chislo-imeni-numerologiya" element={<ChisloImeniNumerologiya />} />
          <Route path="/chislo-dushi-po-date-rozhdeniya" element={<ChisloDushiPoDateRozhdeniya />} />
          <Route path="/vozvrashchenie-saturna-29-30-let" element={<VozvrashchenieSaturna2930Let />} />
          <Route path="/progressii-v-astrologii" element={<ProgressiiVAstrologii />} />
          <Route path="/hiron-v-natalnoj-karte" element={<HironVNatalnojKarte />} />
          <Route path="/severnyj-yuzhnyj-uzly-natalnaya-karta" element={<SevernyjYuzhnyjUzlyNatalnayaKarta />} />
          <Route path="/chislo-goda-2026-numerologiya" element={<ChisloGoda2026Numerologiya />} />
          <Route path="/lilit-v-natalnoj-karte" element={<LilitVNatalnojKarte />} />
          <Route path="/lunnyj-kalendar-strizhek-2026" element={<LunnyjKalendarStrizhek2026 />} />
          <Route path="/venera-v-domah-goroskopa" element={<VeneraVDomahGoroskopa />} />
          <Route path="/mars-v-domah-goroskopa" element={<MarsVDomahGoroskopa />} />
          <Route path="/bogatstvo-v-natalnoy-karte" element={<BogatstvoVNatalnoyKarte />} />
          <Route path="/matrica-sudby-dengi-karma-otnosheniya" element={<MatricaSudbyDengiKarmaOtnosheniya />} />
          <Route path="/braki-i-razvody-v-natalnoy-karte" element={<BrakiIRazvodyvNatalnoyKarte />} />
          <Route path="/kak-vyiti-iz-minusa-v-plyus-po-arkanu" element={<KakVyitiIzMinusaVPlyus />} />
          <Route path="/kak-vychislit-svoy-4-dom" element={<KakVychislitSvoy4Dom />} />
          <Route path="/samorealizaciya-v-natalnoy-karte-zhenshchiny" element={<SamorealizaciyaVNatalnoyKarteZhenshchiny />} />
          <Route path="/astrologicheskaya-sovmestimost" element={<AstrologicheskayaSovmestimost />} />
          <Route path="/neurozen" element={<Neurozen />} />
          <Route path="/12-dom-v-natalnoj-karte" element={<DvenadtsatyiDomGoroskopa />} />
          <Route path="/11-dom-v-natalnoj-karte" element={<OdinnadcatyiDomGoroskopa />} />
          <Route path="/10-dom-v-natalnoj-karte" element={<DesyatyiDomGoroskopa />} />
          <Route path="/9-dom-v-natalnoj-karte" element={<DevyatyiDomGoroskopa />} />
          <Route path="/8-dom-v-natalnoj-karte" element={<VosmoyDomGoroskopa />} />
          <Route path="/7-dom-goroskopa" element={<SedmoyDomGoroskopa />} />
          <Route path="/shestoy-dom-goroskopa" element={<ShestoyDomGoroskopa />} />
          <Route path="/4-dom-goroskopa" element={<ChetvertyiDomGoroskopa />} />
          <Route path="/5-dom-goroskopa" element={<PyatyiDomGoroskopa />} />
          <Route path="/3-dom-goroskopa" element={<TretiDomGoroskopa />} />
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
