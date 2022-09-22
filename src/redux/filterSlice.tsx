import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const sortOptionsList = [
  { id: 0, name: "By Popularity (ASC.)", sort: "rating", order: "asc" },
  { id: 1, name: "By Popularity (DESC.)", sort: "rating", order: "desc" },
  { id: 2, name: "By Price (ASC.)", sort: "price", order: "asc" },
  { id: 3, name: "By Price (DESC.)", sort: "price", order: "desc" },
  { id: 4, name: "By Name (ASC.)", sort: "title", order: "asc" },
  { id: 5, name: "By Name (DESC.)", sort: "title", order: "desc" },
];

export interface SelectedSortOptionType {
  id: number;
  name: string;
  sort: string;
  order: string;
}

export interface filterState {
  searchInputValue: string;
  selectedCategoryId: number;
  selectedSortOption: { id: number; name: string; sort: string; order: string };
}

const initialState: filterState = {
  searchInputValue: "",
  selectedCategoryId: 0,
  selectedSortOption: sortOptionsList[1], // sort By Popularity (DESC.) as default
};

export const filterSlice = createSlice({
  name: "filter",
  initialState, // initialState : initialState
  reducers: {
    updateCategory: (state, action: PayloadAction<number>) => {
      console.log("REDUX TOOLKIT selected category action.payload:", action.payload);
      state.selectedCategoryId = action.payload;
    },
    handleSearch: (state, action: PayloadAction<string>) => {
      console.log("REDUX TOOLKIT handle search action.payload:", action.payload);
      state.searchInputValue = action.payload;
    },
    setSelectedSortOption: (state, action: PayloadAction<number>) => {
      console.log("REDUX set SORT OPTION action.payload:", action.payload);
      state.selectedSortOption = sortOptionsList[action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCategory, handleSearch, setSelectedSortOption } = filterSlice.actions;

export default filterSlice.reducer;
