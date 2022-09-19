import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
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

interface Props {
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ searchInputValue, setSearchInputValue }: Props) => {
  const [pizzaData, setPizzaData] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [selectedSortOption, setSelectedSortOption] = useState<SelectedSortOptionType>(
    sortOptionsList[1]
  ); // sort By Popularity (DESC.) as default

  const handleCategoryChange = (selectedCategoryId: number) => {
    console.log({ selectedCategoryId }, "click");
    setCategoryId(selectedCategoryId);
  };

  // Fetch pizza data
  useEffect(() => {
    const category = categoryId > 0 ? categoryId : "";
    const sortBy = selectedSortOption.sort;
    const order = selectedSortOption.order;

    setIsLoading(true);

    const fetchPizzas = () => {
      console.log("fetch pizzas");
      // fetch("https://632300e8a624bced30841bde.mockapi.io/items")
      // &sortBy=rating&order=desc
      fetch(
        `https://632300e8a624bced30841bde.mockapi.io/items?category=${category}&sortBy=${sortBy}&order=${order}`
      )
        .then((res) => {
          // console.log({ res });
          return res.json();
        })
        .then((data) => {
          setPizzaData(data);
          console.log(data);
          setIsLoading(false);
        });
    };

    fetchPizzas();
  }, [categoryId, selectedSortOption]);

  // Scroll to top of page on page load (return from cart)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    </>
  );
};

export default Home;
