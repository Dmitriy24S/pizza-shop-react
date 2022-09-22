import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import filterSlice from "./filterSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    data: dataSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
