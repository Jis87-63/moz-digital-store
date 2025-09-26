import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';

const adminSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type AdminFormData = z.infer<typeof adminSchema>;

export const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
  });

  // Redirect if user is already admin
  if (currentUser?.isAdmin) {
    return <Navigate to="/painel/admin" replace />;
  }

  // Listen for changes in currentUser after login
  useEffect(() => {
    if (currentUser?.isAdmin) {
      navigate('/painel/admin');
    }
  }, [currentUser, navigate]);

  const onSubmit = async (data: AdminFormData) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
    } catch (error) {
      console.error('Admin login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md card-grok">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Painel Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full btn-hero" disabled={loading}>
              {loading ? 'Entrando...' : 'Acessar Painel'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};