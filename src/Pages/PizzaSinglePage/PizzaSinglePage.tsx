import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { typeNames } from "../../redux/pizzaData/slice";
import { Pizza } from "../../redux/pizzaData/types";
import ErrorPage from "../ErrorPage/ErrorPage";

import styles from "./PizzaSinglePage.module.scss";

const PizzaSinglePage = () => {
  const { id } = useParams();
  console.log("params:", id);
  const navigate = useNavigate();

  const [pizza, setPizza] = useState<Pizza>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPizzaSize, setSelectedPizzaSize] = useState(0);
  const [selectedPizzaType, setSelectedPizzaType] = useState(
    pizza?.types.length === 1 ? pizza?.types[0] : 0
  ); // if only 1 type avaialable then select the only type -> otherwise default is fist(0) type in array

  useEffect(() => {
    const fetchSinglePizza = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://632300e8a624bced30841bde.mockapi.io/items/${id}`);
        setPizza(response.data);
      } catch (error) {
        console.log("error", error);
        alert("Error fetching pizza info");
        navigate("/"); // return to homepage if fail fetch
      }
      setIsLoading(false);
    };

    fetchSinglePizza();
  }, [id, navigate]);

  console.log(pizza);

  if (!pizza && isLoading)
    return <h2 style={{ textAlign: "center", marginTop: "5rem" }}>Loading Pizza...</h2>;

  if (!pizza) return <ErrorPage />;

  return (
    // <div className="pizza-card">
    <div className={`pizza-card ${styles.singlePizzaCard}`}>
      {/* <h2 className="list-title">{pizza.title} Pizza</h2> */}
      <h2 className={styles.title}>{pizza.title} Pizza</h2>
      <img src={pizza.imageUrl} alt={pizza.title} />

      <div className={`pizza-card__selection-block ${styles.singlePizzaSelectionBlock}`}>
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

      <div className={styles.pizzaBottomInfo}>
        <div>
          Rating:
          <span> {pizza.rating}</span>/10
        </div>
        <div>
          Price:
          <span> {pizza.price} $</span>
        </div>
      </div>
      <Link to={`/`} className="btn btn--primary">
        Return home
      </Link>
    </div>
  );
};

export default PizzaSinglePage;
