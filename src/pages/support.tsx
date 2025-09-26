import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MessageCircle, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const supportSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').nonempty('Nome é obrigatório'),
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').nonempty('Mensagem é obrigatória'),
});

type SupportFormData = z.infer<typeof supportSchema>;

export const Support = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: currentUser?.username || '',
      email: currentUser?.email || '',
    },
  });

  const onSubmit = async (data: SupportFormData) => {
    try {
      setLoading(true);
      
      await addDoc(collection(db, 'support_messages'), {
        ...data,
        userId: currentUser?.uid || null,
        isRead: false,
        createdAt: new Date(),
      });

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Nossa equipe responderá em breve.",
      });

      reset();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar mensagem",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient">Suporte</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Precisa de ajuda? Nossa equipe está aqui para auxiliá-lo com qualquer dúvida ou problema.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="card-grok">
            <CardHeader>
              <CardTitle>Envie uma mensagem</CardTitle>
              <CardDescription>
                Descreva seu problema ou dúvida e responderemos o mais rápido possível.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    className="input-grok"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="input-grok"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Descreva sua dúvida ou problema..."
                    className="input-grok min-h-[120px]"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full btn-hero"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="card-grok">
              <CardHeader>
                <CardTitle>Outras formas de contato</CardTitle>
                <CardDescription>
                  Você também pode entrar em contato conosco através dos canais abaixo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-muted-foreground">+258 87 650 685</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">mozstoredigitalp2@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Telegram</p>
                    <a 
                      href="https://t.me/EllonMuskDev" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      t.me/EllonMuskDev
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="card-grok">
              <CardHeader>
                <CardTitle>Perguntas Frequentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Como funciona o pagamento?</h4>
                  <p className="text-sm text-muted-foreground">
                    Utilizamos o Gibrapay para processar pagamentos seguros via transferência bancária.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Quando recebo meu produto?</h4>
                  <p className="text-sm text-muted-foreground">
                    Produtos digitais são entregues instantaneamente após confirmação do pagamento.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Posso pedir reembolso?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sim, oferecemos reembolso em até 24 horas após a compra.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Os produtos são originais?</h4>
                  <p className="text-sm text-muted-foreground">
                    Todos os nossos produtos são 100% originais e verificados.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};