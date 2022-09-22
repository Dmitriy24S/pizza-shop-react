import React, { useEffect, useState } from "react";
// import { ContextType, SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";
import PizzaList from "../components/PizzaList";
import SortDropdown from "../components/SortDropdown";

import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPage, updateData } from "../redux/dataSlice";
import { SelectedSortOptionType, sortOptionsList, updateCategory } from "../redux/filterSlice";
import { RootState } from "../redux/store";

const Home = () => {
  console.log("render Home");

  const selectedCategoryId = useSelector((state: RootState) => state.filter.selectedCategoryId);
  const currentPage = useSelector((state: RootState) => state.data.currentPage);
  const searchInputValue = useSelector((state: RootState) => state.filter.searchInputValue);
  const selectedSortOption = useSelector((state: RootState) => state.filter.selectedSortOption);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [numOfPages, setNumOfPages] = useState(0);
  const itemsPerPage = 6;

  // If start search -> make category all (mockApi limitation/quirk: category + search filter not work together = only show to user total search of all categories)
  useEffect(() => {
    if (searchInputValue) {
      console.log("useEffect: input value, set category to ALL(0)");
      dispatch(updateCategory(0)); // make category all
      dispatch(updateCurrentPage(1)); // update to page 1 when type in search and updating pizza list
    }
  }, [searchInputValue, dispatch]);

  // Fetch pizza data
  useEffect(() => {
    const search = searchInputValue ? `search=${searchInputValue}` : ""; // if entered search value -> add to fetch url
    const category = selectedCategoryId > 0 && !search ? `category=${selectedCategoryId}` : ""; // if selected category -> add to fetch url
    const sortBy = selectedSortOption.sort; // add to fetch url sortBy choice
    const { order } = selectedSortOption; // add to fetch url sort order (asc / desc)

    setIsLoading(true);

    const fetchPizzas = () => {
      console.log("useEffect: try fetch pizzas");
      // fetch("https://632300e8a624bced30841bde.mockapi.io/items")
      // sort: &sortBy=rating&order=desc
      // search/filter?: https://632300e8a624bced30841bde.mockapi.io/items?search=pep
      fetch(
        `https://632300e8a624bced30841bde.mockapi.io/items?${category}${search}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${itemsPerPage}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log({ data }, "fetch data:");
          dispatch(updateData(data.items));
          setNumOfPages(Math.ceil(data.count / itemsPerPage)); // e.g. 10(items) / 6 (items per page)
          setIsLoading(false);
        });
    };

    fetchPizzas();
  }, [selectedCategoryId, selectedSortOption, searchInputValue, currentPage, dispatch]);

  // Scroll to top of page on page load (return from cart) & scroll to top when change pagination page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <div className="container__top">
        <Categories />
        <SortDropdown />
      </div>
      <PizzaList isLoading={isLoading} />
      <Pagination numOfPages={numOfPages} />
    </>
  );
};

export default Home;
