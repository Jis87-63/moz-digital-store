import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

// Pages
import { Landing } from "@/pages/landing";
import { Login } from "@/pages/auth/login";
import { Register } from "@/pages/auth/register";
import { Store } from "@/pages/store/store";
import { CategoryPage } from "@/pages/store/category";
import { ProductPage } from "@/pages/store/product";
import { Cart } from "@/pages/cart/cart";
import { Promotions } from "@/pages/promotions";
import { NewProducts } from "@/pages/new-products";
import { Support } from "@/pages/support";
import { AdminPanel } from "@/pages/admin/admin-panel";
import { Profile } from "@/pages/profile";
import { TermsOfService } from "@/pages/legal/terms";
import { PrivacyPolicy } from "@/pages/legal/privacy";
import { License } from "@/pages/legal/license";
import { PaymentSuccess } from "@/pages/payment/success";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTopWrapper = ({ children }: { children: React.ReactNode }) => {
  useScrollToTop();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="moz-store-theme">
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTopWrapper>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      {/* Main Pages */}
                      <Route path="/" element={<Landing />} />
                      <Route path="/loja" element={<Store />} />
                      <Route path="/categoria/:categoryId" element={<CategoryPage />} />
                      <Route path="/produto/:productId" element={<ProductPage />} />
                      <Route path="/carrinho" element={<Cart />} />
                      <Route path="/promocoes" element={<Promotions />} />
                      <Route path="/novidades" element={<NewProducts />} />
                      <Route path="/suporte" element={<Support />} />
                      <Route path="/perfil" element={<Profile />} />
                      
                      {/* Auth Pages */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/registro" element={<Register />} />
                      
                      {/* Legal Pages */}
                      <Route path="/termos" element={<TermsOfService />} />
                      <Route path="/privacidade" element={<PrivacyPolicy />} />
                      <Route path="/licenca" element={<License />} />
                      
                      {/* Payment Pages */}
                      <Route path="/pagamento/sucesso" element={<PaymentSuccess />} />
                      
                      {/* Admin Pages */}
            <Route path="/painel" element={<AdminPanel />} />
                      
                      {/* 404 Page */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </ScrollToTopWrapper>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
