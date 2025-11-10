import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const DataProcessingPolicy = () => {
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
          Политика конфиденциальности и обработки персональных данных
        </h1>

        <div className="space-y-6 text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground">ИП Соловьёва Анастасия Михайловна</p>
            <p>ОГРНИП: 325774600622532</p>
            <p>ИНН: 352829389470</p>
            <p>Email для обращений субъектов персональных данных: help@aidzen.ru</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Общие положения</h2>
            <p>
              Настоящая Политика обработки персональных данных (далее — Политика) действует в отношении всей информации, которую сервис «Нейродзен» (далее — Оператор) может получить о пользователях во время использования сайта, сервисов, приложений и иных цифровых продуктов. Политика составлена в соответствии с Федеральным законом № 152‑ФЗ «О персональных данных» и иными нормативными актами Российской Федерации.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Персональные данные, которые обрабатываются</h2>
            <p className="mb-2">Оператор может обрабатывать следующие категории данных:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Идентификационные данные (Фамилия, имя, дата рождения)</li>
              <li>Контактные данные (email, мессенджеры)</li>
              <li>Данные о месте и времени рождения (для расчётов)</li>
              <li>Данные о платежах и способах оплаты (в случае платных услуг)</li>
              <li>Техническая информация (cookies, IP‑адрес, информация о браузере и устройстве, история посещений страниц)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. Цели обработки данных</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Регистрация и авторизация пользователя</li>
              <li>Оказание услуг и выполнение обязательств перед пользователем</li>
              <li>Проведение астрологических, нумерологических и иных эзотерических расчётов</li>
              <li>Поддержка и связь с пользователем</li>
              <li>Улучшение качества сервиса и разработка новых функций</li>
              <li>Проведение маркетинговых рассылок и уведомлений (с согласия пользователя)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Правовые основания обработки</h2>
            <p className="mb-2">Оператор обрабатывает данные при наличии законных оснований, включая:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Согласие пользователя</li>
              <li>Заключение и исполнение договора (оказание услуг)</li>
              <li>Исполнение требований закона</li>
              <li>Законные интересы Оператора (например, улучшение работы сервиса и обеспечение безопасности)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Права пользователя (субъекта персональных данных)</h2>
            <p className="mb-2">Пользователь имеет право:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Получать информацию об обработке своих персональных данных</li>
              <li>Требовать уточнения, блокирования или удаления данных</li>
              <li>Отзывать согласие на обработку</li>
              <li>Обжаловать действия (бездействие) Оператора в Роскомнадзор или суд</li>
            </ul>
            <p className="mt-3">Запросы направляются на адрес: help@aidzen.ru</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">10. Меры по защите данных</h2>
            <p>
              Оператор применяет необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, предоставления, распространения, а также от иных неправомерных действий третьих лиц.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DataProcessingPolicy;
