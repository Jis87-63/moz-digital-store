import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const isCart = searchParams.get('cart') === 'true';

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-grok text-center">
        <CardContent className="p-8">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-gradient mb-4">Pagamento Confirmado!</h1>
          <p className="text-muted-foreground mb-8">
            Seu pagamento foi processado com sucesso. 
            {productId ? ' Você pode baixar seu produto agora.' : ' Seus produtos estão prontos.'}
          </p>

          <div className="space-y-4">
            {productId ? (
              <>
                <Button className="w-full btn-hero">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Produto
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Receber Produto
                </Button>
              </>
            ) : (
              <Link to="/loja">
                <Button className="w-full btn-hero">
                  Continuar Comprando
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};