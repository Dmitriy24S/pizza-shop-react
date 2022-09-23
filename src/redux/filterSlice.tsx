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
  currentPage: number;
}

const initialState: filterState = {
  searchInputValue: "",
  selectedCategoryId: 0,
  selectedSortOption: sortOptionsList[1], // sort By Popularity (DESC.) as default
  currentPage: 1,
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
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      console.log("REDUX TOOLKIT update currrent page", action.payload);
      state.currentPage = action.payload;
    },
    // setFilters: (state, action: PayloadAction<string>) => {
    setFilters: (state, action) => {
      console.log("REDUX set FILTERS", action.payload);
      //       REDUX set FILTERS
      // {sortProperty: 'rating', categoryId: '3', currentPage: '1', sort: {…}}
      // categoryId: "3"
      // currentPage :"1"
      // sort : {id: 1, name: 'By Popularity (DESC.)', sort: 'rating', order: 'desc'}
      // sortProperty : "rating"

      state.currentPage = Number(action.payload.currentPage);
      state.selectedCategoryId = Number(action.payload.categoryId);
      // state.selectedSortOption.sort = action.payload.sortProperty;
      state.selectedSortOption = action.payload.sort;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCategory,
  handleSearch,
  setSelectedSortOption,
  updateCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
