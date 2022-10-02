import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { dataLoadingStatusEnum, dataState, Pizza } from "./types";

// mockAPI data:
//  count: 10
//  items :(6) [{…}, {…}, {…}, {…}, {…}, {…}]

export const typeNames = ["thin", "traditional"];
export const itemsPerPage = 6;

const initialState: dataState = {
  pizzaData: [],
  status: dataLoadingStatusEnum.LOADING, // status: "loading",
  count: 10,
  numOfPages: 3,
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
  extraReducers: (builder) => {
    // [fetchPizzas.pending]: (state) => {
    //   state.status = 'loading';
    // } // ? without TypeScript?
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = dataLoadingStatusEnum.LOADING; // state.status = "loading";
      state.pizzaData = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzaData = action.payload.items;
      state.count = action.payload.count;
      state.numOfPages = Math.ceil(action.payload.count / itemsPerPage) || 1; // e.g. 10(items) / 6 (items per page) | // ! if null return 1? prevents app crash? (e.g. when hard enter out of bound url params?)
      state.status = dataLoadingStatusEnum.SUCCESS; // state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = dataLoadingStatusEnum.ERROR; // state.status = "error";
      state.pizzaData = [];
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateData } = dataSlice.actions;

export default dataSlice.reducer;
