import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

enum SortEnum {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}

enum SortOrderEnum {
  ASC = "asc",
  DESC = "desc",
}

export const sortOptionsList: SelectedSortOptionType[] = [
  // { id: 4, name: "By Name (ASC.)", sort: "title", order: "asc" },
  { id: 0, name: "By Popularity (ASC.)", sort: SortEnum.RATING, order: SortOrderEnum.ASC },
  { id: 1, name: "By Popularity (DESC.)", sort: SortEnum.RATING, order: SortOrderEnum.DESC },
  { id: 2, name: "By Price (ASC.)", sort: SortEnum.PRICE, order: SortOrderEnum.ASC },
  { id: 3, name: "By Price (DESC.)", sort: SortEnum.PRICE, order: SortOrderEnum.DESC },
  { id: 4, name: "By Name (ASC.)", sort: SortEnum.TITLE, order: SortOrderEnum.ASC },
  { id: 5, name: "By Name (DESC.)", sort: SortEnum.TITLE, order: SortOrderEnum.DESC },
];

export const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy"];

export interface SelectedSortOptionType {
  id: number;
  name: string;
  sort: SortEnum; // sort: string;  // sort: "rating" | "price" | "title";
  order: SortOrderEnum; // order: string; // order: "asc" | "desc";
}

export interface filterState {
  searchInputValue: string;
  selectedCategoryId: number;
  selectedSortOption: SelectedSortOptionType;
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
      state.selectedSortOption = sortOptionsList[action.payload]; // by index number take info from array
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      console.log("REDUX TOOLKIT update currrent page", action.payload);
      state.currentPage = action.payload;
    },
    // setFilters: (state, action: PayloadAction<string>) => {
    // setFilters: (state, action: PayloadAction<filterState>) => {
    setFilters: (
      state,
      action: {
        payload: {
          // currentPage: number | string; // in Header hard manual passing number / in Home useEffect parse url string
          currentPage: string; // ? from url parse string?
          // categoryId: number | string; // in Header hard manual passing number / in Home useEffect parse url string
          categoryId: string; // ? from url parse string?
          // sort: { id: number; name: string; sort: string; order: string };
          sort: SelectedSortOptionType;
        };
      }
    ) => {
      console.log("REDUX set FILTERS", action.payload);
      // REDUX set FILTERS
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
