import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Helmet>
        <title>Страница не найдена | НейроДзен</title>
        <meta name="description" content="Запрашиваемая страница не найдена. Вернитесь на главную страницу НейроДзен." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="text-center space-y-6 p-8">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">Страница не найдена</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <Button asChild className="mt-4">
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Вернуться на главную
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
