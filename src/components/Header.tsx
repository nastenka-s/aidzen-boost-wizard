import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Send, Smartphone, Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center gap-2">
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={logo} alt="НейроДзен" className="w-10 h-10" />
          <span className="text-base lg:text-lg font-semibold tracking-tight">НЕЙРОДЗЕН</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-2 items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/natal-chart-calculator">НАТАЛЬНАЯ КАРТА</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/matrica-sudby-rasschitat">МАТРИЦА СУДЬБЫ</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/blog">БЛОГ</Link>
          </Button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex gap-2 items-center flex-shrink-0">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
              ВХОД
            </a>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
            <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
              <Send className="w-4 h-4 mr-2" />
              Telegram Бот
            </a>
          </Button>
          <Button size="sm" variant="outline" className="border-primary/30" asChild>
            <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
              <Smartphone className="w-4 h-4 mr-2" />
              RuStore
            </a>
          </Button>
        </div>

        {/* Mobile Actions & Menu */}
        <div className="flex lg:hidden gap-2 items-center flex-shrink-0">
          <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
            <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
              <Send className="w-4 h-4" />
            </a>
          </Button>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Button variant="ghost" size="sm" asChild onClick={() => setOpen(false)}>
                  <Link to="/natal-chart-calculator">НАТАЛЬНАЯ КАРТА</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild onClick={() => setOpen(false)}>
                  <Link to="/matrica-sudby-rasschitat">МАТРИЦА СУДЬБЫ</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild onClick={() => setOpen(false)}>
                  <Link to="/blog">БЛОГ</Link>
                </Button>
                <div className="border-t border-border my-4" />
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
                    ВХОД
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="border-primary/30" asChild>
                  <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
                    <Smartphone className="w-4 h-4 mr-2" />
                    RuStore
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
