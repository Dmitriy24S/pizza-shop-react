import React, { useEffect, useState } from "react";
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

const PizzaList = () => {
  const [pizzaData, setPizzaData] = useState<Pizza[]>([]);

  // console.log(pizzaData);
  // (10) [{id: 0,…}, {id: 1,…}, {id: 2,…}, {id: 3,…}, {id: 4,…}, {id: 5,…}, {id: 6,…}, {id: 7,…}, {id: 8,…},…]
  // 0:
  // category: 0
  // id: 0
  // imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg"
  // price: 803
  // rating: 4
  // sizes: (3) [26, 30, 40]
  // title: "Pepperoni with pepper"
  // types: (2) [0, 1]

  useEffect(() => {
    const fetchPizzas = () => {
      fetch("https://632300e8a624bced30841bde.mockapi.io/items")
        .then((res) => {
          // console.log({ res });
          return res.json();
        })
        .then((data) => {
          setPizzaData(data);
          console.log(data);
        });
    };
    fetchPizzas();
  }, []);

  return (
    <section>
      <h2 className="list-title">All pizzas</h2>
      <div className="content-list">
        {pizzaData.length > 1 ? (
          pizzaData.map((pizza) => <PizzaCard key={pizza.id} pizza={pizza} />)
        ) : (
          //   <h1 style={{ color: "crimson", textAlign: "center" }}>Loading Pizzas...</h1>
          <PizzaCardSkeleton />
        )}
      </div>
    </section>
  );
};

export default PizzaList;
