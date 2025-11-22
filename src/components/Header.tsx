import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Send, Smartphone } from "lucide-react";
import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center gap-4">
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={logo} alt="НейроДзен" className="w-10 h-10" />
          <span className="text-lg font-semibold tracking-tight">НЕЙРОДЗЕН</span>
        </Link>
        
        <nav className="flex gap-2 items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/natal-chart-calculator">НАТАЛЬНАЯ КАРТА</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/matrica-sudby-rasschitat">МАТРИЦА СУДЬБЫ</Link>
          </Button>
          <Button variant="ghost" size="sm" className="hidden lg:flex" asChild>
            <Link to="/blog">БЛОГ</Link>
          </Button>
        </nav>

        <div className="flex gap-2 items-center flex-shrink-0">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
              ВХОД
            </a>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
            <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
              <Send className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Telegram Бот</span>
            </a>
          </Button>
          <Button size="sm" variant="outline" className="border-primary/30" asChild>
            <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
              <Smartphone className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">RuStore</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
