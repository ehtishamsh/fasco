export interface Product {
  id: string;
  title: string;
  price: string;
  stock: number;
  createdAt: string;
  discounted: string;
  updatedAt: string;
  orders?: number;
  rating?: number;
  totalReviews?: number;
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
  // prettier-ignore
  category: Category | string;
  // prettier-ignore
  brand:Brand | string;
  cover: string;
  screenSize: string;
  cpu: string;
  cores?: string;
  mainCamera?: string;
  frontCamera?: string;
  battery: string;
  ram?: string;
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
  screenType?: string;
  sensor?: string;
  zoom?: string;
  features?: string;
  connectivity?: string;
  lens?: string;
  megapixels?: string;
  aperture?: string;
  videoResolution?: string;
  batteryLife?: string;
  gpu?: string;
  compatibleGames?: string;
  maxResolution?: string;
  microphone?: boolean;
  noiseCancellation?: boolean;
  wireless?: boolean;
  numberOfControllers?: string;
  storage?: string;
  type?: string;
}
interface Category {
  name: string;
}
interface Brand {
  name: string;
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
  birthday?: Date;
  gender?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  firstname: string;
  lastname: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  default: boolean;
  shipping: boolean;
  billing: boolean;
}

export interface Variant {
  id: string;
  price: string;
  variant: string;
}

export interface Color {
  id: string;
  color: string;
}

export interface OrderItems {
  id: string;
  price: number;
  total: number;
  variantId: string;
  colorId: string;
  variant: Variant;
  color: Color;
  quantity: number;
  reviewed?: boolean;
  product: Product;
}

export interface Order {
  id: string;
  address?: Address;
  amount: number;
  currency: string;
  orderNumber: number;
  status: string[];
  paymentStatus: string;
  paymentIntentId: string | null;
  createdAt: string;
  updatedAt: string;
  addressId: string;
  userId: string;
  orderStatus: string;
  items?: OrderItems[];
}

export interface Reviews {
  id: string;
  rating: number;
  comment: string;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    firstname: string;
    lastname: string;
  };
}
