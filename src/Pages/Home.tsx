import React, { useEffect, useState } from "react";
import { ContextType, SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";
import PizzaList from "../components/PizzaList";
import SortDropdown from "../components/SortDropdown";

interface SelectedSortOptionType {
  id: number;
  name: string;
  sort: string;
  order: string;
}
interface Pizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}
// ! REPEAT - TODO: refactor! (Home + PizzaList)

const sortOptionsList = [
  { id: 0, name: "By Popularity (ASC.)", sort: "rating", order: "asc" },
  { id: 1, name: "By Popularity (DESC.)", sort: "rating", order: "desc" },
  { id: 2, name: "By Price (ASC.)", sort: "price", order: "asc" },
  { id: 3, name: "By Price (DESC.)", sort: "price", order: "desc" },
  { id: 4, name: "By Name (ASC.)", sort: "title", order: "asc" },
  { id: 5, name: "By Name (DESC.)", sort: "title", order: "desc" },
];
// ! REPEAT - TODO: refactor! (Home + SortDropdown)

const Home = () => {
  const { searchInputValue, setSearchInputValue } = React.useContext(SearchContext) as ContextType;
  const [pizzaData, setPizzaData] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [selectedSortOption, setSelectedSortOption] = useState<SelectedSortOptionType>(
    sortOptionsList[1]
  ); // sort By Popularity (DESC.) as default
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const itemsPerPage = 6;

  const handleCategoryChange = (selectedCategoryId: number) => {
    console.log({ selectedCategoryId }, "click");
    setCategoryId(selectedCategoryId);

    if (searchInputValue) {
      // If showing active filete red pizza data by search -> after select category -> clear input to show user all pizzas in selected category not filtered by search (mockApi limitation/quirk: category + search filter not work together)
      setSearchInputValue("");
    }
    setCurrentPage(1); // update to page 1 when switch category
  };

  const handlePageChange = (num: number) => {
    console.log("handle change page");
    setCurrentPage(num);
  };

  // If start search -> make category all (mockApi limitation/quirk: category + search filter not work together = only show to user total search of all categories)
  useEffect(() => {
    if (searchInputValue) {
      console.log("useEffect input value, set category to ALL(0)");
      setCategoryId(0);
      setCurrentPage(1); // update to page 1 when type in search and updating pizza list
    }
  }, [searchInputValue]);

  // Fetch pizza data
  useEffect(() => {
    const search = searchInputValue ? `search=${searchInputValue}` : ""; // if entered search value -> add to fetch url
    const category = categoryId > 0 && !search ? `category=${categoryId}` : ""; // if selected category -> add to fetch url
    const sortBy = selectedSortOption.sort; // add to fetch url sortBy choice
    const { order } = selectedSortOption; // add to fetch url sort order (asc / desc)

    setIsLoading(true);

    const fetchPizzas = () => {
      console.log("try fetch pizzas");
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
          setPizzaData(data.items);
          setNumOfPages(Math.ceil(data.count / itemsPerPage)); // e.g. 10(items) / 6 (items per page)
          setIsLoading(false);
        });
    };

    fetchPizzas();
  }, [categoryId, selectedSortOption, searchInputValue, currentPage]);

  // Scroll to top of page on page load (return from cart) & scroll to top when change pagination page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <div className="container__top">
        <Categories categoryId={categoryId} handleCategoryChange={handleCategoryChange} />
        <SortDropdown
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
        />
      </div>
      <PizzaList
        categoryId={categoryId}
        isLoading={isLoading}
        pizzaData={pizzaData}
        searchInputValue={searchInputValue}
      />
      <Pagination
        numOfPages={numOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Home;
