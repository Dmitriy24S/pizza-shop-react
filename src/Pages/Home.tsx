import React, { useEffect, useRef } from "react";
// import { ContextType, SearchContext } from "../App";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";
import PizzaList from "../components/PizzaList";
import SortDropdown from "../components/SortDropdown";

import { useWhyDidYouUpdate } from "ahooks";
import { useSelector } from "react-redux";
import {
  setFilters,
  sortOptionsList,
  updateCategory,
  updateCurrentPage,
} from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizzaData/asyncActions";
import { RootState, useAppDispatch } from "../redux/store";

const Home = () => {
  console.log("render Home");

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch(); // !! ?? createAsyncThunk / TypeScript

  const { selectedCategoryId, searchInputValue, selectedSortOption } = useSelector(
    (state: RootState) => state.filter
  );
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);
  const isUrlParams = useRef(false); // false by default url (for URL params)
  const isMounted = useRef(false); // to ignore 1st render (for URL params)

  // If start search -> make category all (mockApi limitation/quirk: category + search filter not work together = only show to user total search of all categories)
  useEffect(() => {
    if (searchInputValue) {
      console.log("useEffect: input value, set category to ALL(0)");
      dispatch(updateCategory(0)); // make category all
      dispatch(updateCurrentPage(1)); // update to page 1 when type in search and updating pizza list
    }
  }, [searchInputValue, dispatch]);

  // Fetching pizza data - Part 1
  // On first render -> Check if URL has params on first render -> send parsed filter values from URL to Redux Toolkit for pizza list fetch
  useEffect(() => {
    if (window.location.search) {
      console.log(window.location.search);
      // ?sortProperty=rating&categoryId=0&currentPage=1
      // parse url
      const params = qs.parse(window.location.search.substring(1)); // (excludes '?' at the beginning, e.g. {?sortProperty...)
      // const params = qs.parse(window.location.search.substring(1)) as Record<string, string>; // ? Record<string, string> not needed? even w/ undefined, no warnings?
      console.log(params, "useEffect: PARAMS");
      // {sortProperty: 'rating', categoryId: '2', currentPage: '1'}

      const sort = sortOptionsList.find(
        (obj) => obj.sort === params.sortProperty && obj.order === "desc"
      );
      console.log(sort, "useEffect: PARAMS - SORT");
      // { id: 0, name: 'By Popularity (ASC.)', sort: 'rating', order: 'asc'}

      // string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined
      const currentPage = params.currentPage as string; // ? v1
      // const categoryId = params.categoryId as string; // ? alternative way for type asign example v2

      // payload: {
      //   currentPage: number | string;
      //   categoryId: number | string;
      //   sort: { id: number; name: string; sort: string; order: string }; // SelectedSortOptionType
      // };

      // if (sort) { // ! undefined warning fix v1
      dispatch(
        setFilters({
          currentPage, // need correct name, exact name pass in setFilters({...}) | set to string for slice action/reducer type match + params parse provide string // ? v1
          categoryId: params.categoryId as string, // ? alternative way for type asign example v2
          sort: sort ? sort : sortOptionsList[1], // ! undefined fix v2
        })
      );
      // }

      isUrlParams.current = true; // set url params true
    }
  }, [dispatch]);

  // Fetching pizza data - Part 2
  // Set URL params - // avoid on 1st render, only after 1st render -> after user actions - Set URL params
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: selectedSortOption.sort,
        categoryId: selectedCategoryId,
        currentPage,
      });
      console.log(queryString); // sortProperty=rating&categoryId=0&currentPage=1
      navigate(`?${queryString}`); // ! causes extra rerenders(full page?, header, logo, header-cart, etc.)? - update url with filter params
    }
    // after 1st render -> make true
    isMounted.current = true;
  }, [selectedCategoryId, selectedSortOption, currentPage, navigate]);

  // Fetching pizza data - Part 3
  // If no URL params -> fetch clean pizza list

  // url ("https://632300e8a624bced30841bde.mockapi.io/items")
  // sort: &sortBy=rating&order=desc
  // search/filter?: https://632300e8a624bced30841bde.mockapi.io/items?search=pep

  // ! FETCH:
  // fetch(
  //   `https://632300e8a624bced30841bde.mockapi.io/items?${category}${search}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${itemsPerPage}`
  // )
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log({ data }, "fetch data:");
  //     dispatch(updateData(data.items));
  //     setNumOfPages(Math.ceil(data.count / itemsPerPage)); // e.g. 10(items) / 6 (items per page)
  //     setIsLoading(false);
  //   });

  // ! AXIOS:
  // axios
  //   .get(
  //     `https://632300e8a624bced30841bde.mockapi.io/items?${category}${search}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${itemsPerPage}`
  //   )
  //   .then((response) => {
  //     console.log(response.data, "fetch data:");
  //     dispatch(updateData(response.data.items));
  //     setNumOfPages(Math.ceil(response.data.count / itemsPerPage)); // e.g. 10(items) / 6 (items per page)
  //     setIsLoading(false);
  //   });

  // ! Redux createAsyncThunk fetch:
  useEffect(() => {
    // const search = searchInputValue ? `search=${searchInputValue}` : ""; // if entered search value -> add to fetch url
    const search = searchInputValue ? `title=${searchInputValue}` : ""; // if entered search value -> add to fetch url // limit to only title search instead of overall search
    const category = selectedCategoryId > 0 && !search ? `category=${selectedCategoryId}` : ""; // if selected category -> add to fetch url
    const sortBy = selectedSortOption.sort; // add to fetch url sortBy choice
    const { order } = selectedSortOption; // add to fetch url sort order (asc / desc)

    // ! Redux createAsyncThunk fetch:
    const getPizzas = async () => {
      console.log("useEffect - GET PIZZA FETCH 1 - Home dispatch", 1111111111);

      dispatch(
        fetchPizzas({
          search,
          category,
          sortBy,
          order,
          currentPage, // ! number here (part3) & (part2) useffect fetch data BUT string in (part1) params parse
        })
      );
    };

    // getPizzas(); // ! not needed? extra fetch? or without this no fetch when load direct url? -> http://localhost:3000/?sortProperty=rating&categoryId=0&currentPage=1 // needed?
    // if (!isUrlParams.current ) {
    // getPizzas(); // ! or this not needed?

    // Fix remove extra unnecessary fetches?
    // Part 1 fetch
    // ? (prevents 2x fetch when have active/selected Category -> start searching pizza, type pizza in input -> categories reset to All to show all searched pizza context for user -> 2x fetches w/ searchInputValue + Category  = rerender Home 2x times = 2x fetches?)
    // if (searchInputValue && selectedCategoryId === 0) {
    if (!searchInputValue) {
      console.log("PART - 1 fetch");
      getPizzas(); // fetches pizza when not searching (e.g. Clicking/Selecting Category -> Fetch 1x selected category pizzas )
    }
    // Part 2 fetch
    if (!isUrlParams.current && selectedCategoryId === 0 && searchInputValue) {
      getPizzas(); // fetches pizza after entering search value with resets category to 0? = 1x fetch of searched value from All pizza categories
      console.log(
        "PART - 2 fetch, useEffect - GET PIZZA FETCH 3 isUrlParams.current",
        isUrlParams.current,
        2222222222
      );
    }
    isUrlParams.current = false; // ! ?
  }, [selectedCategoryId, selectedSortOption, searchInputValue, currentPage, dispatch]);

  // Scroll to top of page on page load (return from cart) & scroll to top when change pagination page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useWhyDidYouUpdate("Home", {
    selectedSortOption,
    sortOptionsList,
    selectedCategoryId,
    searchInputValue,
    currentPage,
    isUrlParams,
    isMounted,
  });

  return (
    <>
      <div className="container__top">
        <Categories />
        <SortDropdown />
      </div>
      <PizzaList />
      <Pagination />
      {/* <Pagination numOfPages={numOfPages} /> */}
    </>
  );
};

export default Home;
