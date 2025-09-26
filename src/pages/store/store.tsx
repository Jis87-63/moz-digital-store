import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProducts, useCategories } from '@/hooks/use-products';
import { useCart } from '@/contexts/cart-context';
import { Product } from '@/types';

export const Store = () => {
  const { categories } = useCategories();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(product => product.categoryId === categoryId).slice(0, 5);
  };

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
      <Card className="card-product w-44 flex-shrink-0">
        <CardContent className="p-3">
          {/* Product Image */}
          <div className="relative mb-3">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-24 object-cover rounded-md"
            />
            {product.discountPercentage && (
              <Badge className="absolute -top-1 -right-1 bg-destructive text-xs px-1 py-0">
                -{product.discountPercentage}%
              </Badge>
            )}
            {product.isNew && (
              <Badge className="absolute -top-1 -left-1 bg-success text-xs px-1 py-0">
                NOVO
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm line-clamp-2 leading-tight">{product.name}</h3>
            
            <div className="space-y-1">
              {pricing.original && (
                <p className="text-xs text-muted-foreground line-through">{pricing.original}</p>
              )}
              <p className="font-semibold text-sm text-primary">{pricing.final}</p>
            </div>

            <Button
              size="sm"
              onClick={() => addToCart(product)}
              className="w-full h-7 text-xs btn-hero"
            >
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">Moz Store Digital</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra produtos digitais autênticos com entrega instantânea e pagamentos seguros.
          </p>
        </div>

        {/* Categories and Products */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.id);
            
            if (categoryProducts.length === 0) return null;

            return (
              <section key={category.id} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                    {category.description && (
                      <p className="text-muted-foreground hidden md:block">
                        {category.description}
                      </p>
                    )}
                  </div>
                  
                  <Link to={`/categoria/${category.id}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Ver tudo
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Products Horizontal Scroll */}
                <div className="relative">
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {categoryProducts.map((product) => (
                      <Link key={product.id} to={`/produto/${product.id}`}>
                        <ProductCard product={product} />
                      </Link>
                    ))}
                  </div>
                  
                  {/* Scroll buttons for desktop */}
                  <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2">
                    <Button variant="ghost" size="icon" className="bg-card/80 backdrop-blur">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2">
                    <Button variant="ghost" size="icon" className="bg-card/80 backdrop-blur">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhuma categoria encontrada</h3>
            <p className="text-muted-foreground">
              As categorias de produtos ainda estão sendo configuradas.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};