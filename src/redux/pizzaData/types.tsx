export enum dataLoadingStatusEnum {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export interface Pizza {
  id: number; // ! no type error -> mockapi changed id from number to string -> no type error? // TODO
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

// type PizzaFetchParamsType = Record<string, string>;
export interface PizzaFetchParamsType {
  search: string;
  category: string;
  sortBy: string;
  order: string;
  currentPage: number; // ! TODO string / number in Home?
  // currentPage: string;
}

export interface PizzaFetchDataType {
  items: Pizza[];
  count: number;
}

export interface dataState {
  pizzaData: Pizza[];
  status: dataLoadingStatusEnum; // status: "loading" | "error" | "success";
  count: number;
  numOfPages: number;
}
