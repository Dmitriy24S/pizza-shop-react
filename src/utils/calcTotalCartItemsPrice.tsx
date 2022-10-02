import { CartItemType } from "../redux/cart/types";

// Calculate total cart price with all items
export const calcTotalCartItemsPrice = (cartItems: CartItemType[]) => {
  return cartItems.reduce((sum, obj) => {
    return obj.price * obj.amount + sum;
  }, 0);
};
