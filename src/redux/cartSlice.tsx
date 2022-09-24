import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

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
}

const initialState: CartStateType = {
  cartItems: [],
};

// Update/calculate total cart items (e.g. 1 type of item/pizza but more than 1 amount of that pizza)
export const calcTotalItems = (cartItems: CartItemType[]) => {
  return cartItems.reduce((a, b) => a + b.amount, 0);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemtoCart: (state, action: PayloadAction<CartItemType>) => {
      if (state.cartItems.length > 0) {
        console.log("2. item already in cart -> increment existing pizza/item amount");
        const existingPizzaInCart = state.cartItems.find(
          (item) =>
            item.title === action.payload.title &&
            item.sizes === action.payload.sizes &&
            item.types === action.payload.types
        );
        if (existingPizzaInCart) {
          existingPizzaInCart.amount += 1; // if already in cart -> increase pizza/item amount
        } else {
          console.log("3. cart not empty -> add NEW ITEM");
          state.cartItems.push(action.payload); // cart not empty -> add new item to cart
        }
      } else {
        console.log("1. empty cart -> add 1st item");
        state.cartItems.push(action.payload); // cart is empty -> add 1st item
      }
    },
    decrementCartItem: (state, action) => {
      // const cartItem = state.cartItems.find(
      //   (item) =>
      //     item.title === action.payload.title &&
      //     item.sizes === action.payload.sizes &&
      //     item.types === action.payload.types
      // );
      const updatedItems = state.cartItems.map((item) => {
        if (
          item.title === action.payload.title &&
          item.sizes === action.payload.sizes &&
          item.types === action.payload.types
        ) {
          if (item.amount > 1) {
            console.log("CART ITEM MATCH -> DECREMENT");
            return { ...item, amount: item.amount - 1 }; // item decrement
          } else return item; // if only 1 item left -> stop decrementing, keep at 1 amount
        }
        return item;
      });
      console.log(updatedItems, "updatedItems: after decrement");
      state.cartItems = updatedItems;
    },
  },
});

export const { addItemtoCart, decrementCartItem } = cartSlice.actions;
export default cartSlice.reducer;
