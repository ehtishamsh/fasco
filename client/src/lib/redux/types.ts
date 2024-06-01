export interface Product {
  id: number;
  title: string;
  price: string;
  thumbnail: string;
  category: string;
  description: string;
  brand: string;
  quantity?: number; // Add quantity property for cart items
  rating: number;
  stock?: number;
}
export type CartState = {
  cart: {
    items: Product[];
  };
};

export type WishlistState = {
  wishlist: {
    items: Product[];
  };
};
export type StepData = {
  step: number;
  name: string;
  active: boolean;
};
