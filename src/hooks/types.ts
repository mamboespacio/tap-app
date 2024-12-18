export interface Session {
  jwt: string,
}
export interface User {
  id: string,
  fullName: string,
  email: string,
}
export interface Category {
  id: string;
  name: string;
  slug: string;
}
export interface Vendor {
  id: string;
  name: string;
  slug: string;
  address: string;
  openingHours: string;
  closingHours: string;
}
export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  salePrice: string;
  onSale: boolean;
}
export interface CartItem {
  product: Product,
  quantity: number
}

export interface Cart {
  products: CartItem[]
}