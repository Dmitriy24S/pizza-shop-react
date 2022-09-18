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
// ! REPEAT - TODO: refactor!

interface Props {
  categoryId: number;
  isLoading: boolean;
  pizzaData: Pizza[];
}
const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy"];
// ! REPEAT - TODO: refactor!

const PizzaList = ({ categoryId, isLoading, pizzaData }: Props) => {
  return (
    <section>
      {/* <h2 className="list-title">All pizzas</h2> */}
      <h2 className="list-title">{categories[categoryId]} pizzas</h2>
      <div className="content-list">
        {isLoading
          ? [...Array(10)].map((_card, index) => <PizzaCardSkeleton key={index} />)
          : pizzaData.map((pizza) => <PizzaCard key={pizza.id} pizza={pizza} />)}
        {/* {pizzaData.length > 0 */}
        {/*  <h1 style={{ color: "crimson", textAlign: "center" }}> Loading Pizzas... </h1> */}
      </div>
    </section>
  );
};

export default PizzaList;
