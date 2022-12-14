import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartSlice from "./cart/slice";
import filterSlice from "./filter/slice";
import dataSlice from "./pizzaData/slice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    data: dataSlice,
    cart: cartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // !! ?? createAsyncThunk / TypeScript
