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
        <div className="container mx-auto px-4 h-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-scale">
            <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">MD</span>
            </div>
            <span className="font-bold text-lg text-gradient hidden sm:block">
              Moz Store Digital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/loja" className="text-foreground/80 hover:text-primary transition-colors text-sm">
              Loja
            </Link>
            <Link to="/promocoes" className="text-foreground/80 hover:text-primary transition-colors text-sm">
              Promoções
            </Link>
            <Link to="/novidades" className="text-foreground/80 hover:text-primary transition-colors text-sm">
              Novidades
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hover-scale h-8 w-8 p-0"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Cart */}
            <Link to="/carrinho">
              <Button variant="ghost" size="sm" className="relative hover-scale h-8 w-8 p-0">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                    {totalItems > 9 ? '9+' : totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDrawerOpen(true)}
                className="hover-scale md:hidden h-8 w-8 p-0"
              >
                <User className="h-4 w-4" />
              </Button>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                    Entrar
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button size="sm" className="btn-hero h-8 px-3 text-xs">
                    Registrar
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden hover-scale h-8 w-8 p-0"
            >
              <Menu className="h-4 w-4" />
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