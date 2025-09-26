import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MD</span>
              </div>
              <span className="font-bold text-xl text-gradient">Moz Store Digital</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              A melhor loja online para produtos digitais em Moçambique. 
              Streaming, ebooks, gaming, recargas e muito mais com pagamentos seguros.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/loja" className="hover:text-primary transition-colors">
                  Loja
                </Link>
              </li>
              <li>
                <Link to="/promocoes" className="hover:text-primary transition-colors">
                  Promoções
                </Link>
              </li>
              <li>
                <Link to="/novidades" className="hover:text-primary transition-colors">
                  Novidades
                </Link>
              </li>
              <li>
                <Link to="/suporte" className="hover:text-primary transition-colors">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+258 87 650 685</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>mozstoredigitalp2@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <a 
                  href="https://t.me/EllonMuskDev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  t.me/EllonMuskDev
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-muted-foreground">
              <Link to="/termos" className="hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link to="/privacidade" className="hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/licenca" className="hover:text-primary transition-colors">
                Licença
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground text-center">
              © 2025 Moz Store Digital. Todos os direitos reservados.
              <br className="md:hidden" />
              <span className="hidden md:inline"> | </span>
              Licença de uso exclusiva para Moçambique.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};