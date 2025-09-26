import { Link } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/hooks/use-products';
import { useCart } from '@/contexts/cart-context';
import { Product } from '@/types';

export const Promotions = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  // Filter products with discounts
  const promotionalProducts = products.filter(product => product.discountPercentage && product.discountPercentage > 0);

  const formatPrice = (price: number, discountPercentage?: number) => {
    if (discountPercentage) {
      const discountedPrice = price * (1 - discountPercentage / 100);
      return {
        original: `${price.toFixed(2)} MZN`,
        final: `${discountedPrice.toFixed(2)} MZN`,
      };
    }
    return {
      final: `${price.toFixed(2)} MZN`,
    };
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const pricing = formatPrice(product.price, product.discountPercentage);

    return (
      <Card className="card-product">
        <CardContent className="p-4">
          {/* Product Image */}
          <div className="relative mb-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <Badge className="absolute -top-1 -right-1 bg-destructive text-xs px-1 py-0">
              -{product.discountPercentage}%
            </Badge>
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm leading-tight line-clamp-2">{product.name}</h3>
            
            <div className="space-y-1">
              {pricing.original && (
                <p className="text-xs text-muted-foreground line-through">{pricing.original}</p>
              )}
              <p className="font-semibold text-primary">{pricing.final}</p>
              <p className="text-xs text-success font-medium">
                Economia: {product.discountPercentage}%
              </p>
            </div>

            <div className="space-y-2">
              <Link to={`/produto/${product.id}`}>
                <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                  Ver Detalhes
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={() => addToCart(product)}
                className="w-full h-8 text-xs btn-hero"
              >
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando promoções...</p>
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
              Voltar à Loja
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center">
                <Tag className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gradient">Promoções</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra produtos com descontos especiais e economize em suas compras digitais.
            </p>
          </div>
        </div>

        {/* Promotional Products Grid */}
        {promotionalProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {promotionalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhuma promoção ativa</h3>
            <p className="text-muted-foreground mb-4">
              No momento não temos produtos em promoção. Volte em breve!
            </p>
            <Link to="/loja">
              <Button variant="outline">
                Ver Todos os Produtos
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};