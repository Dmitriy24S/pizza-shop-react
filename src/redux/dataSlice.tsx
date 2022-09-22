import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface Pizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

// mockAPI data:
//  count: 10
//  items :(6) [{…}, {…}, {…}, {…}, {…}, {…}]

export interface dataState {
  pizzaData: Pizza[];
  currentPage: number;
}

const initialState: dataState = {
  pizzaData: [],
  currentPage: 1,
};

export const dataSlice = createSlice({
  name: "data",
  initialState, // initialState : initialState
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      console.log("REDUX TOOLKIT update currrent page", action.payload);
      state.currentPage = action.payload;
    },
    updateData: (state, action: PayloadAction<Pizza[]>) => {
      console.log("REDUX update DATA");
      state.pizzaData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentPage, updateData } = dataSlice.actions;

export default dataSlice.reducer;
