import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useProducts, useCategories } from '@/hooks/use-products';
import { useCart } from '@/contexts/cart-context';
import { Product } from '@/types';
import { useState } from 'react';

export const Store = () => {
  const { categories } = useCategories();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

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
      <Card className="card-product w-52 flex-shrink-0 group">
        <CardContent className="p-4">
          {/* Product Image */}
          <div className="relative mb-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {product.discountPercentage && (
              <Badge className="absolute -top-2 -right-2 bg-destructive text-white text-xs px-2 py-1 shadow-sm">
                -{product.discountPercentage}%
              </Badge>
            )}
            {product.isNew && (
              <Badge className="absolute -top-2 -left-2 bg-success text-white text-xs px-2 py-1 shadow-sm">
                NOVO
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm line-clamp-2 leading-relaxed text-foreground">
              {product.name}
            </h3>
            
            <div className="space-y-1">
              {pricing.original && (
                <p className="text-xs text-muted-foreground line-through">{pricing.original}</p>
              )}
              <p className="font-bold text-lg text-primary">{pricing.final}</p>
            </div>

            <Button
              size="sm"
              onClick={() => addToCart(product)}
              className="w-full btn-hero h-9 text-sm font-medium"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Header */}
      <div className="bg-card/30 backdrop-blur-sm border-b border-border/30">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">MD</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Moz Store Digital
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Produtos digitais autênticos com entrega instantânea e pagamentos seguros para Moçambique
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mt-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-grok"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories and Products */}
        <div className="space-y-16">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.id);
            
            if (categoryProducts.length === 0) return null;

            return (
              <section key={category.id} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-foreground">{category.name}</h2>
                    {category.description && (
                      <p className="text-muted-foreground text-base">
                        {category.description}
                      </p>
                    )}
                  </div>
                  
                  <Link to={`/categoria/${category.id}`}>
                    <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/5">
                      Ver todos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Products Horizontal Scroll */}
                <div className="relative">
                  <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
                    {categoryProducts.map((product) => (
                      <Link key={product.id} to={`/produto/${product.id}`} className="flex-shrink-0">
                        <ProductCard product={product} />
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-foreground">Loja em Preparação</h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              Estamos organizando nossos produtos para oferecer a melhor experiência. 
              Volte em breve para descobrir produtos incríveis!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};