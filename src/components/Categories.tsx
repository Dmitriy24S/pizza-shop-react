import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPage } from "../redux/dataSlice";
import { handleSearch, updateCategory } from "../redux/filterSlice";
import { RootState } from "../redux/store";

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy"];
// ! REPEAT - TODO: refactor! (PizzaList + Categories)

const Categories = () => {
  const selectedCategoryId = useSelector((state: RootState) => state.filter.selectedCategoryId);
  const searchInputValue = useSelector((state: RootState) => state.filter.searchInputValue);
  const dispatch = useDispatch();

  console.log("render CATEGORIES");

  return (
    <section className="categories">
      <ul>
        {categories.map((category, index) => (
          <li key={category}>
            <button
              className={selectedCategoryId === index ? "active" : ""}
              onClick={() => {
                dispatch(updateCategory(index));
                if (searchInputValue) {
                  // If showing active filtered pizza data by search -> after select category -> clear input to show user all pizzas in selected category not filtered by search (mockApi limitation/quirk: category + search filter not work together)
                  dispatch(handleSearch(""));
                }
                dispatch(updateCurrentPage(1)); // update to page 1 when switch category
              }}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
