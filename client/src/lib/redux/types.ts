export interface Product {
  id: string;
  title: string;
  price: string;
  stock: number;
  variants: [
    {
      id: string;
      name: string;
      price: string;
    }
  ];
  colors: [
    {
      id: string;
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
  slug: string;
  selectedVariant?: {
    id: string;
    name: string;
    price: string;
  };
  selectedColor?: {
    id: string;
    name: string;
  };
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

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: Date;
  updatedAt: Date;
}
