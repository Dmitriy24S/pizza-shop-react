import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { itemsPerPage } from "./slice";
import { PizzaFetchDataType, PizzaFetchParamsType } from "./types";

export const fetchPizzas = createAsyncThunk(
  "data/fetchPizzas",
  async (params: PizzaFetchParamsType, thunkAPI) => {
    const { search, category, sortBy, order, currentPage } = params;
    // const response = await axios.get(
    const { data } = await axios.get<PizzaFetchDataType>(
      `https://632300e8a624bced30841bde.mockapi.io/items?${category}${search}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${itemsPerPage}`
    );
    console.log("FETCH PIZZA DATA - Async Thunk", data, 33333333);
    // count: 10
    // items: (6) [{…}, {…}, {…}, {…}, {…}, {…}
    return data;
  }
);
