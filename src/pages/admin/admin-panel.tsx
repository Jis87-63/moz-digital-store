import { useState, useEffect } from 'react';
import { Shield, Plus, Package, Image, MessageSquare, Star, Edit, Trash2, Sparkles, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  downloadLink?: string;
  redirectLink?: string;
  isNew: boolean;
  discount?: number;
  createdAt: Date;
}

interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  isActive: boolean;
  createdAt: Date;
}

interface SupportMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

const categories = [
  'Streaming',
  'Ebooks', 
  'Gaming',
  'Jogos',
  'Recarregas',
  'Comprar PayPal'
];

export const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const { toast } = useToast();

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    downloadLink: '',
    redirectLink: '',
    isNew: false,
    discount: ''
  });

  // Banner form state
  const [bannerForm, setBannerForm] = useState({
    title: '',
    description: '',
    link: '',
    isActive: true
  });

  const [productImage, setProductImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  // Load data
  useEffect(() => {
    loadProducts();
    loadBanners();
    loadSupportMessages();
  }, []);

  const loadProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const loadBanners = async () => {
    try {
      const q = query(collection(db, 'banners'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const bannersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Banner[];
      setBanners(bannersData);
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
    }
  };

  const loadSupportMessages = async () => {
    try {
      const q = query(collection(db, 'support'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SupportMessage[];
      setSupportMessages(messagesData);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const uploadImage = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleAddProduct = async () => {
    if (!productForm.name || !productForm.price || !productForm.category || !productImage) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha todos os campos obrigatórios"
      });
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage(productImage, 'products');
      
      await addDoc(collection(db, 'products'), {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        category: productForm.category,
        imageUrl,
        downloadLink: productForm.downloadLink,
        redirectLink: productForm.redirectLink,
        isNew: productForm.isNew,
        discount: productForm.discount ? parseFloat(productForm.discount) : 0,
        createdAt: new Date()
      });

      resetProductForm();
      loadProducts();
      toast({
        title: "Sucesso",
        description: "Produto adicionado com sucesso!"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao adicionar produto"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct || !productForm.name || !productForm.price || !productForm.category) {
      return;
    }

    setLoading(true);
    try {
      let imageUrl = editingProduct.imageUrl;
      
      if (productImage) {
        imageUrl = await uploadImage(productImage, 'products');
      }

      await updateDoc(doc(db, 'products', editingProduct.id), {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        category: productForm.category,
        imageUrl,
        downloadLink: productForm.downloadLink,
        redirectLink: productForm.redirectLink,
        isNew: productForm.isNew,
        discount: productForm.discount ? parseFloat(productForm.discount) : 0
      });

      setEditingProduct(null);
      resetProductForm();
      loadProducts();
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso!"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao atualizar produto"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      loadProducts();
      toast({
        title: "Sucesso",
        description: "Produto removido com sucesso!"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao remover produto"
      });
    }
  };

  const handleAddBanner = async () => {
    if (!bannerForm.title || !bannerImage) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Título e imagem são obrigatórios"
      });
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage(bannerImage, 'banners');
      
      await addDoc(collection(db, 'banners'), {
        title: bannerForm.title,
        description: bannerForm.description,
        imageUrl,
        link: bannerForm.link,
        isActive: bannerForm.isActive,
        createdAt: new Date()
      });

      resetBannerForm();
      loadBanners();
      toast({
        title: "Sucesso",
        description: "Banner adicionado com sucesso!"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao adicionar banner"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      downloadLink: '',
      redirectLink: '',
      isNew: false,
      discount: ''
    });
    setProductImage(null);
  };

  const resetBannerForm = () => {
    setBannerForm({
      title: '',
      description: '',
      link: '',
      isActive: true
    });
    setBannerImage(null);
  };

  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      downloadLink: product.downloadLink || '',
      redirectLink: product.redirectLink || '',
      isNew: product.isNew,
      discount: product.discount?.toString() || ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient">Painel Administrativo</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Gerencie produtos, banners e mensagens de suporte.
          </p>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Novidades
            </TabsTrigger>
            <TabsTrigger value="promotions" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Promoções
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Banners
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Suporte
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Produto</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nome do produto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (MZN)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={productForm.category} onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">Desconto (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={productForm.discount}
                      onChange={(e) => setProductForm(prev => ({ ...prev, discount: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição do produto"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="download">Link de Download</Label>
                    <Input
                      id="download"
                      value={productForm.downloadLink}
                      onChange={(e) => setProductForm(prev => ({ ...prev, downloadLink: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="redirect">Link de Redirecionamento</Label>
                    <Input
                      id="redirect"
                      value={productForm.redirectLink}
                      onChange={(e) => setProductForm(prev => ({ ...prev, redirectLink: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Imagem do Produto</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={(e) => setProductImage(e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Formatos aceitos: Imagens (JPG, PNG, etc.) e Documentos (PDF, DOC, DOCX, TXT)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={productForm.isNew}
                    onChange={(e) => setProductForm(prev => ({ ...prev, isNew: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="isNew">Marcar como novidade</Label>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={editingProduct ? handleEditProduct : handleAddProduct}
                    disabled={loading}
                    className="btn-hero"
                  >
                    {loading ? 'Salvando...' : editingProduct ? 'Atualizar' : 'Adicionar'} Produto
                  </Button>
                  {editingProduct && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingProduct(null);
                        resetProductForm();
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Produtos Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {products.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-bold text-primary">{product.price} MZN</span>
                            {product.discount > 0 && (
                              <Badge variant="destructive">{product.discount}% OFF</Badge>
                            )}
                            {product.isNew && (
                              <Badge className="bg-green-500">
                                <Star className="h-3 w-3 mr-1" />
                                Novo
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Gerenciar Novidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Produtos marcados como novidade aparecerão na página de Novidades.
                </p>
                <div className="grid gap-4">
                  {products.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <span className="font-bold text-primary">{product.price} MZN</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.isNew ? (
                          <Badge className="bg-green-500">
                            <Star className="h-3 w-3 mr-1" />
                            Novidade
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Normal</Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promotions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Gerenciar Promoções
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Produtos com desconto aparecerão na página de Promoções.
                </p>
                <div className="grid gap-4">
                  {products.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">{product.price} MZN</span>
                            {product.discount > 0 && (
                              <Badge variant="destructive">{product.discount}% OFF</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.discount > 0 ? (
                          <Badge variant="destructive">
                            <Tag className="h-3 w-3 mr-1" />
                            {product.discount}% OFF
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Sem desconto</Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Adicionar Banner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bannerTitle">Título</Label>
                    <Input
                      id="bannerTitle"
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Título do banner"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bannerLink">Link (opcional)</Label>
                    <Input
                      id="bannerLink"
                      value={bannerForm.link}
                      onChange={(e) => setBannerForm(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bannerDescription">Descrição</Label>
                  <Textarea
                    id="bannerDescription"
                    value={bannerForm.description}
                    onChange={(e) => setBannerForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição do banner"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bannerImage">Imagem do Banner</Label>
                  <Input
                    id="bannerImage"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={(e) => setBannerImage(e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Formatos aceitos: Imagens (JPG, PNG, etc.) e Documentos (PDF, DOC, DOCX, TXT)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={bannerForm.isActive}
                    onChange={(e) => setBannerForm(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Banner ativo</Label>
                </div>

                <Button 
                  onClick={handleAddBanner}
                  disabled={loading}
                  className="btn-hero"
                >
                  {loading ? 'Salvando...' : 'Adicionar'} Banner
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Banners Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {banners.map(banner => (
                    <div key={banner.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={banner.imageUrl} 
                          alt={banner.title}
                          className="w-20 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{banner.title}</h3>
                          <p className="text-sm text-muted-foreground">{banner.description}</p>
                          <Badge variant={banner.isActive ? "default" : "secondary"}>
                            {banner.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mensagens de Suporte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {supportMessages.map(message => (
                    <div key={message.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{message.name}</h3>
                          <p className="text-sm text-muted-foreground">{message.email}</p>
                        </div>
                        <Badge variant={message.isRead ? "default" : "destructive"}>
                          {message.isRead ? 'Lida' : 'Nova'}
                        </Badge>
                      </div>
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {message.createdAt instanceof Date 
                          ? message.createdAt.toLocaleString()
                          : new Date((message.createdAt as any).seconds * 1000).toLocaleString()
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};