import React, { useState } from "react";

interface Props {
  pizza: {
    id: number;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
  };
}

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

const typeNames = ["thin", "traditional"];

const PizzaCard = ({ pizza }: Props) => {
  const [selectedPizzaType, setSelectedPizzaType] = useState(
    pizza.types.length === 1 ? pizza.types[0] : 0
  ); // if only 1 type avaialable then select the only type -> otherwise default is fist(0) type in array
  const [selectedPizzaSize, setSelectedPizzaSize] = useState(0);

  return (
    <div className="pizza-card">
      <a href="#/">
        <img src={pizza.imageUrl} alt={pizza.title} />
        <h4 className="pizza-title">{pizza.title}</h4>
      </a>

      <div className="selection-block">
        {/* pizza type */}
        <ul className="pizza-types">
          {pizza.types.map((typeId) => (
            //   "types": [1],
            <li
              key={typeId}
              className={selectedPizzaType === typeId ? "active" : ""}
              onClick={() => setSelectedPizzaType(typeId)}
            >
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        {/* pizza sizes */}
        <ul className="pizza-sizes">
          {pizza.sizes.map((size, index) => (
            //  "sizes": [26, 30, 40],
            <li
              key={size}
              //   className={pizza.sizes[selectedPizzaSize] === pizza.sizes[index] ? "active" : ""}
              className={selectedPizzaSize === index ? "active" : ""}
              onClick={() => setSelectedPizzaSize(index)}
            >
              {size} cm.
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PizzaCard;
