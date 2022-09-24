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

export const typeNames = ["thin", "traditional"];

export interface dataState {
  pizzaData: Pizza[];
}

const initialState: dataState = {
  pizzaData: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState, // initialState : initialState
  reducers: {
    updateData: (state, action: PayloadAction<Pizza[]>) => {
      console.log("REDUX update DATA");
      state.pizzaData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateData } = dataSlice.actions;

export default dataSlice.reducer;
