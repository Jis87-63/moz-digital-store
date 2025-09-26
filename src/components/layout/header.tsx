import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, User, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { useCart } from '@/contexts/cart-context';
import { useTheme } from '@/providers/theme-provider';
import { MobileDrawer } from './mobile-drawer';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  const { currentUser } = useAuth();
  const { totalItems } = useCart();
  const { theme, setTheme } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-scale">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MD</span>
            </div>
            <span className="font-bold text-xl text-gradient hidden sm:block">
              Moz Store Digital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/loja" className="text-foreground/80 hover:text-primary transition-colors">
              Loja
            </Link>
            <Link to="/promocoes" className="text-foreground/80 hover:text-primary transition-colors">
              Promoções
            </Link>
            <Link to="/novidades" className="text-foreground/80 hover:text-primary transition-colors">
              Novidades
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover-scale"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Cart */}
            <Link to="/carrinho">
              <Button variant="ghost" size="icon" className="relative hover-scale">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                    {totalItems > 9 ? '9+' : totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(true)}
                className="hover-scale md:hidden"
              >
                <User className="h-5 w-5" />
              </Button>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button size="sm" className="btn-hero">
                    Registrar
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden hover-scale"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
};