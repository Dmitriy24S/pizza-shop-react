import React from "react";
import { Link } from "react-router-dom";
import EmptyCartImg from "../assets/img/empty-cart.png";

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>Cart is empty 🥲</h2>
      <p>
        You have not ordered pizza.
        <br />
        To order pizza return to home page.
      </p>
      <img src={EmptyCartImg} alt="empty cart" />
      <Link to={`/`} className="btn btn--black">
        Return to homepage
      </Link>
    </div>
  );
};

export default CartEmpty;
