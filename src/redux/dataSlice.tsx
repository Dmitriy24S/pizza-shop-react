import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// mockAPI data:
//  count: 10
//  items :(6) [{…}, {…}, {…}, {…}, {…}, {…}]

export const typeNames = ["thin", "traditional"];
const itemsPerPage = 6;

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

interface PizzaFetchParamsType {
  search: string;
  category: any;
  sortBy: any;
  order: any;
  currentPage: any;
}

export const fetchPizzas = createAsyncThunk(
  "data/fetchPizzas",
  async (params: PizzaFetchParamsType, thunkAPI) => {
    const { search, category, sortBy, order, currentPage } = params;
    // const response = await axios.get(
    const { data } = await axios.get(
      `https://632300e8a624bced30841bde.mockapi.io/items?${category}${search}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${itemsPerPage}`
    );
    console.log("FETCH PIZZA DATA - Async Thunk", data, 33333333);
    // return response.data
    return data;
  }
);

export interface dataState {
  pizzaData: Pizza[];
  status: "loading" | "error" | "success";
  count: number;
  numOfPages: number;
}

const initialState: dataState = {
  pizzaData: [],
  status: "loading",
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
      state.status = "loading";
      state.pizzaData = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzaData = action.payload.items;
      state.count = action.payload.count;
      state.numOfPages = Math.ceil(action.payload.count / action.payload.count) || 1; // e.g. 10(items) / 6 (items per page) | if null return 1?
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.pizzaData = [];
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateData } = dataSlice.actions;

export default dataSlice.reducer;
