export interface Product {
  id: number;
  title: string;
  price: string;
  thumbnail: string;
  category: string;
  quantity?: number; // Add quantity property for cart items
}
