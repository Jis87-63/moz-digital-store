import { Navigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient">Meu Perfil</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Gerencie suas informações pessoais e histórico de compras.
          </p>
        </div>
      </div>
    </div>
  );
};