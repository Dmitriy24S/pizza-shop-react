import { CartItemType } from "../redux/cart/types";
import { calcTotalCartItemsPrice } from "./calcTotalCartItemsPrice";

// On state creation (redux initial state) receive cart items from localStorage and calculate cart total price
export const getCartItemsFromLocalStorage = () => {
  console.log("REDUX: get CART ITEMS localStorage", 666666);

  const data = localStorage.getItem("cart");
  // if there is stored cart data already in localStorage get it : otherwise empty cart [] array:
  const cartItems: CartItemType[] = data ? JSON.parse(data) : [];
  const totalCartPrice = calcTotalCartItemsPrice(cartItems);
  // Return values for state:
  return {
    cartItems,
    totalCartPrice,
  };
};
