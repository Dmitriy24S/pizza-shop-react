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
  totalCartPrice: number;
}

const initialState: CartStateType = {
  cartItems: [],
  totalCartPrice: 0,
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
          // state.totalCartPrice += existingPizzaInCart.price;
        } else {
          console.log("3. cart not empty -> add NEW ITEM");
          state.cartItems.push(action.payload); // cart not empty -> add new item to cart
          //  state.totalCartPrice += action.payload.price;
        }
      } else {
        console.log("1. empty cart -> add 1st item");
        state.cartItems.push(action.payload); // cart is empty -> add 1st item
        // state.totalCartPrice += action.payload.price;
      }
      // calc total total cart price:
      state.totalCartPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.amount + sum;
      }, 0);
    },
    decrementCartItem: (state, action: PayloadAction<CartItemType>) => {
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
            state.totalCartPrice -= item.price;
            return { ...item, amount: item.amount - 1 }; // item decrement
          } else return item; // if only 1 item left -> stop decrementing, keep at 1 amount
        }
        return item;
      });
      console.log(updatedItems, "updatedItems: after decrement");
      state.cartItems = updatedItems;
      // calc total total cart price:
      state.totalCartPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.amount + sum;
      }, 0);
    },
    deleteCartItem: (state, action: PayloadAction<CartItemType>) => {
      console.log("Redux: delete item form cart", action.payload);
      // {id: 8, imageUrl: 'https://dodopizza.azureedge.net/static/Img/Product…za/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg', title: 'Four Seasons', types: 0, sizes: 40, …}
      // amount: 1
      // category: 1
      // id: 8
      // imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg"
      // price: 7.99
      // rating: 10
      // sizes: 40
      // title:  "Four Seasons"
      // types: 0

      const updatedCartItems = state.cartItems.filter(
        (item) =>
          item.title !== action.payload.title ||
          item.sizes !== action.payload.sizes ||
          item.types !== action.payload.types
      );
      console.log({ updatedCartItems });

      // Pepperoni
      // thin, 26cm.
      // Pepperoni
      // thin, 40cm.

      state.cartItems = updatedCartItems;
      // calc total cart price:
      state.totalCartPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.amount + sum;
      }, 0);
    },
    clearAllCart: (state) => {
      state.cartItems = [];
      state.totalCartPrice = 0;
    },
  },
});

export const { addItemtoCart, decrementCartItem, deleteCartItem, clearAllCart } = cartSlice.actions;
export default cartSlice.reducer;
