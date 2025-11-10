import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const DataProcessing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="НейроДзен" className="w-10 h-10" />
            <span className="text-lg font-semibold tracking-tight">НЕЙРОДЗЕН</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
          </Link>
        </div>
      </header>

      {/* Policy Content */}
      <article className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-gradient">
          Согласие на обработку персональных данных
        </h1>

        <div className="space-y-6 text-muted-foreground">
          <p>
            Я, субъект персональных данных (далее — Субъект), настоящим подтверждаю, что свободно, по своей воле и в своих интересах даю Индивидуальному предпринимателю Соловьёвой Анастасии Михайловне (ИНН 352829389470) (далее — Оператор) конкретное, предметное, информированное, сознательное и однозначное согласие на обработку моих персональных данных на следующих условиях:
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Цели обработки</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Регистрация и идентификация на сайте и/или в мобильном приложении Оператора</li>
              <li>Заключение, исполнение и прекращение договоров</li>
              <li>Оформление заказов, расчёты, доставка товаров и оказание услуг</li>
              <li>Предоставление клиентской и технической поддержки</li>
              <li>Ведение бухгалтерского и налогового учёта</li>
              <li>Сбор и обработка статистической информации о пользовании сервисом</li>
              <li>Исполнение требований законодательства Российской Федерации</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Перечень персональных данных</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Фамилия, имя</li>
              <li>Пол, дата и место рождения</li>
              <li>Контактные данные: адрес электронной почты</li>
              <li>Сведения об аккаунтах в социальных сетях и мессенджерах</li>
              <li>История посещений сайта и использования сервисов, IP‑адрес, файлы cookie, геолокационные данные</li>
              <li>Иные сведения, передаваемые Субъектом персональных данных по своей воле и необходимые для достижения указанных целей</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. Действия с персональными данными</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение)</li>
              <li>Извлечение, использование, передача (распространение, предоставление, доступ), включая передачу третьим лицам</li>
              <li>Обезличивание, блокирование, удаление и уничтожение</li>
              <li>Автоматизированная и (или) смешанная обработка с использованием информационно‑телекоммуникационных сетей</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Условия обработки и срок действия</h2>
            <p className="mb-3">
              Настоящее согласие действует бессрочно. Субъект вправе отозвать согласие в любое время, направив уведомление Оператору по адресу электронной почты, указанному на сайте. Отзыв согласия не влияет на законность обработки, осуществленной до момента получения отзыва.
            </p>
            <p>
              Субъект подтверждает, что действует свободно и подтверждает ознакомление с Политикой в отношении обработки персональных данных.
            </p>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="font-semibold text-foreground">ИП Соловьёва Анастасия Михайловна</p>
            <p>ОГРНИП: 325774600622532</p>
            <p>ИНН: 352829389470</p>
            <p>Email для обращений субъектов персональных данных: help@aidzen.ru</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DataProcessing;
