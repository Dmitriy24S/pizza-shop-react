import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import { categories } from "../redux/filter/slice";
import { RootState } from "../redux/store";
import PizzaCard from "./PizzaCard/PizzaCard";
import PizzaCardSkeleton from "./PizzaCard/PizzaCardSkeleton";

const skeletons = [...Array(10)].map((_card, index) => <PizzaCardSkeleton key={index} />);

const PizzaList = () => {
  const { selectedCategoryId, searchInputValue } = useSelector((state: RootState) => state.filter);
  const { pizzaData, status } = useSelector((state: RootState) => state.data);

  // Filtered pizza data
  const pizzas = pizzaData
    // filter v1. - local filter fot static data:
    // .filter((item) => item.title.toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase()))
    // v.2 - filter from backend -> recieve filtered data
    .map((pizza) => <PizzaCard key={pizza.id} pizza={pizza} />);

  return (
    <section>
      <h2 className="list-title">
        {searchInputValue ? `Searching: '${searchInputValue}'` : categories[selectedCategoryId]}{" "}
        pizzas
      </h2>
      <div className="content-list">
        {status === "loading" && skeletons}
        {status === "success" && pizzas}
        {status === "error" && <ErrorPage />}
      </div>
    </section>
  );
};

export default PizzaList;
