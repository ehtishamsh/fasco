export interface Product {
  id: number;
  title: string;
  price: string;
  thumbnail: string;
  category: string;
  description: string;
  brand: string;
  quantity?: number; // Add quantity property for cart items
}
export type CartState = {
  cart: {
    items: Product[];
  };
};
export type StepData = {
  step: number;
  name: string;
  active: boolean;
};
