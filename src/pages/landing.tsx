import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, BookOpen, Gamepad2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth-context';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Banner } from '@/types';

export const Landing = () => {
  const { currentUser } = useAuth();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Load banners from Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'banners'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bannersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Banner[];
      
      setBanners(bannersData);
    });

    return unsubscribe;
  }, []);

  // Auto-rotate banners
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const features = [
    {
      icon: Play,
      title: 'Streaming Premium',
      description: 'Acesso a plataformas de streaming com contas verificadas e seguras',
      color: 'text-red-500'
    },
    {
      icon: BookOpen,
      title: 'Ebooks & Cursos',
      description: 'Biblioteca digital com os melhores ebooks e cursos online',
      color: 'text-blue-500'
    },
    {
      icon: Gamepad2,
      title: 'Gaming & Jogos',
      description: 'Games, contas de gaming e créditos para suas plataformas favoritas',
      color: 'text-green-500'
    },
    {
      icon: Smartphone,
      title: 'Recargas & PayPal',
      description: 'Recargas de telemóvel e contas PayPal verificadas',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-grok-glow">
                <span className="text-white font-bold text-2xl">MD</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gradient">
                Moz Store Digital
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              A sua loja digital de confiança em Moçambique.
              <br />
              <span className="text-primary font-medium">
                Produtos digitais autênticos, pagamentos seguros, entrega instantânea.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/loja">
                <Button size="lg" className="btn-hero min-w-[180px] hover-lift">
                  Explorar Loja
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              {!currentUser && (
                <div className="flex gap-3">
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="min-w-[120px]">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/registro">
                    <Button size="lg" className="btn-soft min-w-[120px]">
                      Registrar
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                ✓ Pagamentos Seguros
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                ✓ Entrega Instantânea
              </Badge>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                ✓ Suporte 24/7
              </Badge>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Banner Carousel Section */}
      {banners.length > 0 && (
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Promoções em Destaque</h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-grok-lg">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`transition-all duration-500 ${
                    index === currentBanner ? 'block' : 'hidden'
                  }`}
                >
                  {banner.link ? (
                    <Link to={banner.link} className="block">
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="w-full h-64 md:h-96 object-cover hover-scale"
                      />
                    </Link>
                  ) : (
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            {banners.length > 1 && (
              <div className="flex justify-center space-x-2 mt-6">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentBanner
                        ? 'bg-primary scale-110'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que escolher a Moz Store Digital?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos produtos digitais de qualidade com segurança e conveniência 
            para todos os moçambicanos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-grok hover-lift">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-xl bg-accent/20 mb-4 ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de clientes satisfeitos e descubra o melhor 
            em produtos digitais em Moçambique.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/loja">
              <Button size="lg" variant="secondary" className="min-w-[200px] hover-lift">
                Explorar Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            {!currentUser && (
              <Link to="/registro">
                <Button size="lg" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white hover:text-primary">
                  Criar Conta Grátis
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};