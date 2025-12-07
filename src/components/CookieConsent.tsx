import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Небольшая задержка для плавного появления
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-foreground/90 mb-2">
                Мы используем файлы cookie для улучшения работы сайта и персонализации контента. 
                Продолжая использовать сайт, вы даёте согласие на обработку cookie в соответствии с{' '}
                <Link 
                  to="/dataprocessingpolicy" 
                  className="text-primary hover:underline"
                >
                  Политикой обработки персональных данных
                </Link>.
              </p>
              <p className="text-xs text-muted-foreground">
                Согласие на обработку персональных данных (ФЗ-152)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDecline}
                className="order-2 sm:order-1"
              >
                Отклонить
              </Button>
              <Button 
                size="sm"
                onClick={handleAccept}
                className="order-1 sm:order-2"
              >
                Принять
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
