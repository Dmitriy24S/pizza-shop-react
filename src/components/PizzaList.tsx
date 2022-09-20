import React from "react";
// import pizzaData from "../assets/data.json";
import PizzaCard from "./PizzaCard/PizzaCard";
import PizzaCardSkeleton from "./PizzaCard/PizzaCardSkeleton";

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

interface Props {
  categoryId: number;
  isLoading: boolean;
  pizzaData: Pizza[];
  searchInputValue: string;
}
const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy"]; // ! REPEAT - TODO: refactor!  (PizzaList + Categories)
const skeletons = [...Array(10)].map((_card, index) => <PizzaCardSkeleton key={index} />);

const PizzaList = ({ categoryId, isLoading, pizzaData, searchInputValue }: Props) => {
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
        {searchInputValue ? `Searching: '${searchInputValue}'` : categories[categoryId]} pizzas
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
