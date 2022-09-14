import React from "react";
import pizzaData from "../assets/data.json";
import PizzaCard from "./PizzaCard";

const PizzaList = () => {
  // console.log(pizzaData);
  // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  // 0:
  // category: 0
  // id: 0
  // imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg"
  // price: 803
  // rating: 4
  // sizes: (3) [26, 30, 40]
  // title: "Pepperoni with pepper"
  // types: (2) [0, 1]

  return (
    <section>
      <h2 className="list-title">All pizzas</h2>
      <div className="content-list">
        {pizzaData.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </section>
  );
};

export default PizzaList;
