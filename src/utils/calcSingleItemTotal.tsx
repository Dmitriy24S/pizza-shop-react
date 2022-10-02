import { CartItemType } from "../redux/cart/types";

// Update/calculate total of single cart item (e.g. several orders of 1 type of pizza -> 1 pizza price * amount)
export const calcSingleItemTotal = (cartItem: CartItemType) => {
  return (cartItem.price * cartItem.amount).toFixed(2);
};
