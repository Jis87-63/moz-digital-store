import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { createPayment } from '@/lib/gibrapay';
import { useState } from 'react';

export const Cart = () => {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const formatPrice = (price: number, discountPercentage?: number) => {
    if (discountPercentage) {
      const discountedPrice = price * (1 - discountPercentage / 100);
      return discountedPrice;
    }
    return price;
  };

  const handleCheckout = async () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Faça login",
        description: "Você precisa fazer login para finalizar a compra",
      });
      navigate('/login');
      return;
    }

    if (items.length === 0) return;

    try {
      setCheckoutLoading(true);
      
      const itemsDescription = items.map(item => 
        `${item.product.name} (${item.quantity}x)`
      ).join(', ');
      
      const paymentData = {
        amount: totalPrice,
        currency: 'MZN',
        description: `Carrinho: ${itemsDescription}`,
        customer_phone: currentUser.phone,
        callback_url: `${window.location.origin}/pagamento/sucesso?cart=true`
      };

      const response = await createPayment(paymentData);
      
      if (response.status === 'success') {
        toast({
          title: "Pagamento iniciado",
          description: "Você será redirecionado para completar o pagamento",
        });
        
        // Clear cart after successful payment initiation
        clearCart();
        
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
      setCheckoutLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Carrinho vazio</h3>
          <p className="text-muted-foreground mb-6">
            Adicione alguns produtos ao seu carrinho para continuar.
          </p>
          <Link to="/loja">
            <Button className="btn-hero">
              Explorar Produtos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/loja">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuar Comprando
            </Button>
          </Link>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gradient">Meu Carrinho</h1>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Carrinho
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const finalPrice = formatPrice(item.product.price, item.product.discountPercentage);
              const itemTotal = finalPrice * item.quantity;

              return (
                <Card key={item.productId} className="card-grok">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full sm:w-24 h-24 object-cover rounded-lg"
                        />
                        {item.product.discountPercentage && (
                          <Badge className="absolute -top-1 -right-1 bg-destructive text-xs">
                            -{item.product.discountPercentage}%
                          </Badge>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <div className="flex items-center space-x-2 text-sm">
                              {item.product.discountPercentage && (
                                <span className="text-muted-foreground line-through">
                                  {item.product.price.toFixed(2)} MZN
                                </span>
                              )}
                              <span className="text-primary font-semibold">
                                {finalPrice.toFixed(2)} MZN
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.productId)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 bg-muted rounded text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-semibold">
                              {itemTotal.toFixed(2)} MZN
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card className="card-grok">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => {
                    const finalPrice = formatPrice(item.product.price, item.product.discountPercentage);
                    const itemTotal = finalPrice * item.quantity;
                    
                    return (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span>{item.product.name} ({item.quantity}x)</span>
                        <span>{itemTotal.toFixed(2)} MZN</span>
                      </div>
                    );
                  })}
                </div>
                
                <hr className="border-border" />
                
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{totalPrice.toFixed(2)} MZN</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full btn-hero h-12"
                >
                  {checkoutLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processando...
                    </div>
                  ) : (
                    'Finalizar Compra'
                  )}
                </Button>

                {/* Security Info */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>✓ Pagamento seguro via Gibrapay</p>
                  <p>✓ Entrega instantânea</p>
                  <p>✓ Reembolso em 24h</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};