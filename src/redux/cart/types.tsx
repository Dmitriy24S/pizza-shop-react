export interface CartItemType {
  category: number;
  id: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number;
  title: string;
  types: number;
  amount: number;
}

export interface CartStateType {
  cartItems: CartItemType[];
  totalCartPrice: number;
}
