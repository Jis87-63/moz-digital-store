// Types for Moz Store Digital

export interface User {
  uid: string;
  username: string;
  email: string;
  phone: string;
  createdAt: Date;
  isAdmin?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in MZN
  categoryId: string;
  imageUrl: string;
  downloadLink?: string; // for ebooks and games
  redirectLink?: string; // for other products like paypal, recharges
  isNew?: boolean;
  discountPercentage?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number; // in MZN
  status: 'pending' | 'paid' | 'delivered' | 'cancelled';
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  userId?: string;
  isRead: boolean;
  createdAt: Date;
}