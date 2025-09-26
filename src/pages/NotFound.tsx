import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-primary rounded-full shadow-glow mb-8 animate-pulse">
              <span className="text-6xl font-bold text-white">404</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Página Não Encontrada
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Oops! A página que você está procurando não existe ou foi movida. 
              Que tal explorar nossa loja digital?
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="card-grok hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Página Inicial</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Volte para nossa página inicial e descubra produtos incríveis
                </p>
                <Link to="/">
                  <Button size="sm" className="btn-hero">
                    Ir para Início
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-grok hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Explorar Loja</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Navegue por nossa coleção de produtos digitais
                </p>
                <Link to="/loja">
                  <Button size="sm" variant="outline" className="hover:bg-success/5 hover:border-success/50">
                    Ver Produtos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="lg"
              onClick={() => window.history.back()}
              className="text-primary hover:text-primary/80 hover:bg-primary/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à página anterior
            </Button>
          </div>

          {/* Fun Elements */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="animate-bounce">🚀</span>
              <span>Moz Store Digital - Sempre evoluindo</span>
              <span className="animate-bounce">✨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default NotFound;
