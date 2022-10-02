export enum SortEnum {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}

export enum SortOrderEnum {
  ASC = "asc",
  DESC = "desc",
}

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
