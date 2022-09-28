import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartSlice from "./cartSlice";
import dataSlice from "./dataSlice";
import filterSlice from "./filterSlice";

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
