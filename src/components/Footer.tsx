import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, Smartphone } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="НейроДзен" className="w-10 h-10" />
              <span className="text-lg font-semibold">НЕЙРОДЗЕН</span>
            </Link>
            <p className="text-sm text-muted-foreground">Ваш персональный ИИ-наставник по эзотерике</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Документы</h3>
            <div className="space-y-2 text-sm">
              <Link
                to="/dataprocessingpolicy"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Политика конфиденциальности
              </Link>
              <Link to="/dataprocessing" className="block text-muted-foreground hover:text-primary transition-colors">
                Обработка персональных данных
              </Link>
              <Link to="/publicoffer" className="block text-muted-foreground hover:text-primary transition-colors">
                Публичная оферта
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Контакты</h3>
            <div className="flex gap-3">
              <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                <a href="https://t.me/Neurodzenaibot" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </Button>
              <Button size="sm" variant="outline" className="border-primary/30" asChild>
                <a href="https://aidzen.app/login" target="_blank" rel="noopener noreferrer">
                  <Smartphone className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 НейроДзен. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
