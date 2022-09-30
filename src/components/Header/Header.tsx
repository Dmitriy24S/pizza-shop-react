import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import HeaderLogo from "../../assets/img/pizza-logo.svg";
import { calcTotalItems } from "../../redux/cartSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import Search from "../Search/Search";
import styles from "./Header.module.scss";

import { setFilters, sortOptionsList } from "../../redux/filterSlice";

const Header = () => {
  console.log("render HEADER");
  const location = useLocation();
  const dispatch = useAppDispatch(); // !! ?? createAsyncThunk / TypeScript

  const { cartItems, totalCartPrice } = useSelector((state: RootState) => state.cart);

  // ! Not needed?:
  // const [totalCartItems, setTotalCartItems] = useState(0);
  // Update/calculate total cart items (e.g. 1 type of item/pizza but more than 1 amount of that pizza)
  // useEffect(() => {
  //   setTotalCartItems(calcTotalItems(cartItems));
  // }, [cartItems]);
  // ! same?:
  const totalCartItems = calcTotalItems(cartItems); // ! ?

  // Reset PizzaList to initalState (fetch initial unfiltered pizza list):
  const resetPizzaList = () => {
    // initialState:
    // currentPage: 1,
    // selectedCategoryId: 0,
    // selectedSortOption: sortOptionsList[1], // sort By Popularity (DESC.) as default
    dispatch(
      setFilters({
        currentPage: "1", // currentPage: 1, // make string to match filterSlice type string + searchParams parses = string
        categoryId: "0", // categoryId: 0,
        sort: sortOptionsList[1],
      })
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to={`/`} className={styles.logoContainer} onClick={resetPizzaList}>
          <img src={HeaderLogo} alt="Pizza Shop Logo" width="38" />
          <div>
            <h1>Pizza Shop</h1>
            <p>Tasties pizza ever</p>
          </div>
        </Link>

        {/* Cart & Search Container (div container is for mobile row) */}
        <div className={styles.SearchAndCartContainer}>
          {/* Search (show on home page, hide when on cart page) */}
          {location.pathname !== "/cart" && <Search />}

          {/* Cart */}
          <Link to={`cart`} className={styles.cartBtn}>
            <span>{totalCartPrice.toFixed(2)} $</span>
            <div className={styles.separator}></div>
            <span>
              {/* cart svg */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              {/* {cartItems.length} */}
              {totalCartItems}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
