import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProduct } from '@/hooks/use-products';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { createPayment } from '@/lib/gibrapay';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { product, loading } = useProduct(productId);
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const formatPrice = (price: number, discountPercentage?: number) => {
    if (discountPercentage) {
      const discountedPrice = price * (1 - discountPercentage / 100);
      return {
        original: `${price.toFixed(2)} MZN`,
        final: `${discountedPrice.toFixed(2)} MZN`,
        finalValue: discountedPrice,
      };
    }
    return {
      final: `${price.toFixed(2)} MZN`,
      finalValue: price,
    };
  };

  const handleBuyNow = async () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Faça login",
        description: "Você precisa fazer login para comprar produtos",
      });
      navigate('/login');
      return;
    }

    if (!product) return;

    try {
      setPaymentLoading(true);
      
      const pricing = formatPrice(product.price, product.discountPercentage);
      
      const paymentData = {
        amount: pricing.finalValue,
        currency: 'MZN',
        description: `Compra: ${product.name}`,
        customer_phone: currentUser.phone,
        callback_url: `${window.location.origin}/pagamento/sucesso?product=${product.id}`
      };

      const response = await createPayment(paymentData);
      
      if (response.status === 'success') {
        toast({
          title: "Pagamento iniciado",
          description: "Você será redirecionado para completar o pagamento",
        });
        
        // Redirect to payment URL or show payment instructions
        if (response.payment_url) {
          window.location.href = response.payment_url;
        }
      } else {
        throw new Error(response.message || 'Erro ao processar pagamento');
      }
    } catch (error: any) {
      console.error('Erro no pagamento:', error);
      toast({
        variant: "destructive",
        title: "Erro no pagamento",
        description: error.message || "Tente novamente mais tarde",
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Produto não encontrado</h3>
          <p className="text-muted-foreground mb-4">
            O produto que você está procurando não foi encontrado.
          </p>
          <Link to="/loja">
            <Button variant="outline">
              Voltar à Loja
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const pricing = formatPrice(product.price, product.discountPercentage);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/loja">
          <Button variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar à Loja
          </Button>
        </Link>

        {/* Product Details */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <Card className="card-grok">
                <CardContent className="p-6">
                  <div className="relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    {product.discountPercentage && (
                      <Badge className="absolute top-2 right-2 bg-destructive text-white">
                        -{product.discountPercentage}% OFF
                      </Badge>
                    )}
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-success text-white">
                        NOVO
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                
                {/* Price */}
                <div className="mb-6">
                  {pricing.original && (
                    <p className="text-xl text-muted-foreground line-through mb-1">
                      {pricing.original}
                    </p>
                  )}
                  <p className="text-3xl font-bold text-primary">{pricing.final}</p>
                  {product.discountPercentage && (
                    <p className="text-sm text-success font-medium mt-1">
                      Você economiza {product.discountPercentage}%!
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    onClick={handleBuyNow}
                    disabled={paymentLoading}
                    className="w-full btn-hero h-12"
                  >
                    {paymentLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processando...
                      </div>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Comprar Agora
                      </>
                    )}
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      addToCart(product);
                      toast({
                        title: "Produto adicionado",
                        description: "O produto foi adicionado ao seu carrinho",
                      });
                    }}
                    className="w-full h-12"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Adicionar ao Carrinho
                  </Button>
                </div>

                {/* Security Info */}
                <div className="mt-8 p-4 bg-accent/20 rounded-lg">
                  <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <span className="text-success mr-2">✓</span>
                      Pagamento seguro via Gibrapay
                    </div>
                    <div className="flex items-center">
                      <span className="text-success mr-2">✓</span>
                      Entrega instantânea após pagamento
                    </div>
                    <div className="flex items-center">
                      <span className="text-success mr-2">✓</span>
                      Política de reembolso em 24h
                    </div>
                    <div className="flex items-center">
                      <span className="text-success mr-2">✓</span>
                      Suporte técnico 24/7
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};