import { CartItemType } from "../redux/cart/types";

// Update/calculate total cart items (e.g. 1 type of item/pizza but more than 1 amount of that pizza -> therefore should not me total items 1 -> but instead include each item/pizza amount )
export const calcTotalItems = (cartItems: CartItemType[]) => {
  return cartItems.reduce((a, b) => a + b.amount, 0);
};
