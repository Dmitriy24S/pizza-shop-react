import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemtoCart } from "../../redux/cartSlice";
import { typeNames } from "../../redux/dataSlice";
import { RootState } from "../../redux/store";
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

const PizzaCard = ({ pizza }: Props) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [selectedPizzaType, setSelectedPizzaType] = useState(
    pizza.types.length === 1 ? pizza.types[0] : 0
  ); // if only 1 type avaialable then select the only type -> otherwise default is fist(0) type in array
  const [selectedPizzaSize, setSelectedPizzaSize] = useState(0);

  const checkPizzaAmoutInCart = () => {
    const findPizza = cartItems.find((obj) => obj.title === pizza.title);
    return findPizza ? findPizza.amount : null;
  };

  const pizzaAmount = checkPizzaAmoutInCart();

  return (
    <div className="pizza-card">
      <a href="#/">
        <img src={pizza.imageUrl} alt={pizza.title} />
        <h4 className="pizza-card__title">{pizza.title}</h4>
      </a>

      <div className="pizza-card__selection-block">
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

      {/* pizza price / add to cart */}
      <div className="pizza-card__bottom">
        <div className="pizza-price">from {pizza.price} $</div>
        <button
          className="add-cart-btn"
          onClick={() => {
            console.log("click ADD TO CART", {
              ...pizza,
              sizes: pizza.sizes[selectedPizzaSize],
              types: pizza.types[selectedPizzaType],
            });
            // {id: 8, imageUrl: 'https://dodopizza.azureedge.net/static/Img/Product…za/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg', title: 'Four Seasons', types: 1, sizes: 26, title: "Four Seasons", types: 1 …}
            //
            dispatch(
              addItemtoCart({
                ...pizza,
                sizes: pizza.sizes[selectedPizzaSize],
                types: pizza.types[selectedPizzaType],
                amount: 1,
              })
            );
          }}
        >
          {/* plus svg */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="currentColor"
            ></path>
          </svg>
          {/* Add
          <span className="pizza-amount">
          {checkPizzaAmoutInCart()}
          </span> */}
          Add {pizzaAmount && <span className="pizza-amount">{pizzaAmount}</span>}
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;
