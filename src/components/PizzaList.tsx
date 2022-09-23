import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PizzaCard from "./PizzaCard/PizzaCard";
import PizzaCardSkeleton from "./PizzaCard/PizzaCardSkeleton";

interface Props {
  isLoading: boolean;
}
const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy"]; // ! REPEAT - TODO: refactor!  (PizzaList + Categories)
const skeletons = [...Array(10)].map((_card, index) => <PizzaCardSkeleton key={index} />);

const PizzaList = ({ isLoading }: Props) => {
  const { selectedCategoryId, searchInputValue } = useSelector((state: RootState) => state.filter);
  const pizzaData = useSelector((state: RootState) => state.data.pizzaData);

  // Filtered pizza data
  const pizzas = pizzaData
    // filter v1. - local filter fot static data:
    // .filter((item) => item.title.toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase()))
    // v.2 - filter from backend -> recieve filtered data
    .map((pizza) => <PizzaCard key={pizza.id} pizza={pizza} />);

  return (
    <section>
      {/* <h2 className="list-title">All pizzas</h2> */}
      <h2 className="list-title">
        {searchInputValue ? `Searching: '${searchInputValue}'` : categories[selectedCategoryId]}{" "}
        pizzas
      </h2>
      <div className="content-list">
        {isLoading ? skeletons : pizzas}
        {/* {pizzaData.length > 0 */}
        {/*  <h1 style={{ color: "crimson", textAlign: "center" }}> Loading Pizzas... </h1> */}
      </div>
    </section>
  );
};

export default PizzaList;
