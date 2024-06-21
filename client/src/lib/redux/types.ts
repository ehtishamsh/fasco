export interface Product {
  id: string;
  title: string;
  price: string;
  stock: number;
  variants: [
    {
      name: string;
      price: string;
    }
  ];
  colors: [
    {
      name: string;
    }
  ];

  description: string;
  category: string;
  brand: string;
  cover: string;
  screenSize: string;
  cpu: string;
  cores: string;
  mainCamera: string;
  frontCamera?: string;
  battery: string;
  ram: string;
  quantity?: number;
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
