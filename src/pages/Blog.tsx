import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { blogPosts } from "@/data/blogPosts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Блог НейроДзен: статьи по астрологии и нумерологии | НейроДзен</title>
        <meta name="description" content="Блог о астрологии, нумерологии и эзотерике. Полезные статьи о натальных картах, совместимости, числе судьбы и астрологических расчетах." />
        <meta name="keywords" content="блог астрология, нумерология статьи, натальная карта, астрология обучение, эзотерика" />
        <link rel="canonical" href="https://aidzen.ru/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Блог НейроДзен: статьи по астрологии и нумерологии" />
        <meta property="og:description" content="Блог о астрологии, нумерологии и эзотерике. Полезные статьи о натальных картах, совместимости, числе судьбы." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aidzen.ru/blog" />
        <meta property="og:site_name" content="НейроДзен" />
        <meta property="og:locale" content="ru_RU" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Блог НейроДзен: статьи по астрологии и нумерологии" />
        <meta name="twitter:description" content="Блог о астрологии, нумерологии и эзотерике. Полезные статьи о натальных картах и астрологии." />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Блог НейроДзен",
            "url": "https://aidzen.ru/blog",
            "description": "Блог о астрологии, нумерологии и эзотерике",
            "publisher": {
              "@type": "Organization",
              "name": "НейроДзен",
              "url": "https://aidzen.ru"
            }
          })}
        </script>
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary font-medium mb-4">
              Блог
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              НЕЙРОДЗЕН - блог духовного нейропомощника
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Астролог, нумеролог, духовный наставник
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post, i) => (
              <Link key={i} to={post.link}>
                <Card className="group p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer h-full">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.desc}
                      </p>
                      <p className="text-xs text-muted-foreground">{post.date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                      Читать далее
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
