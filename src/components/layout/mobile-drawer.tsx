import { Link } from 'react-router-dom';
import { X, User, Tag, Sparkles, MessageCircle, LogOut, Home, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context';
import { useCart } from '@/contexts/cart-context';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-lg animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          <div className="flex-1 p-4 space-y-4">
            {/* User Info */}
            {currentUser && (
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{currentUser.username}</p>
                    <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="space-y-2">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Início</span>
              </Link>

              <Link
                to="/loja"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <Store className="h-5 w-5" />
                <span>Loja</span>
              </Link>

              <Link
                to="/promocoes"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <Tag className="h-5 w-5" />
                <span>Promoções</span>
              </Link>

              <Link
                to="/novidades"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <Sparkles className="h-5 w-5" />
                <span>Novidades</span>
              </Link>

              <Link
                to="/suporte"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Suporte</span>
              </Link>
            </nav>

            <Separator />

            {/* Auth Actions */}
            {currentUser ? (
              <div className="space-y-2">
                <Link
                  to="/perfil"
                  onClick={onClose}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Perfil</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-destructive w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={onClose}>
                  <Button variant="outline" className="w-full">
                    Entrar
                  </Button>
                </Link>
                <Link to="/registro" onClick={onClose}>
                  <Button className="w-full btn-hero">
                    Registrar
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Moz Store Digital
          </div>
        </div>
      </div>
    </div>
  );
};