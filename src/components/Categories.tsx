import { useWhyDidYouUpdate } from "ahooks";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categories, handleSearch, updateCategory, updateCurrentPage } from "../redux/filter/slice";
import { RootState } from "../redux/store";

// const Categories = React.memo(() => {
const Categories = () => {
  const dispatch = useDispatch();
  const { selectedCategoryId, searchInputValue } = useSelector((state: RootState) => state.filter);

  console.log("render CATEGORIES");
  useWhyDidYouUpdate("Categories", { selectedCategoryId, searchInputValue });
  // search value causes rerender? + Home rerender (navigate react router or else cause rerender (searchValue + category change?)

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
                  // If showing active filtered pizza data by search -> after select category ->
                  // -> clear search input to show user all pizzas in selected category not filtered by search (mockApi limitation/quirk: category + search filter not work together)
                  dispatch(handleSearch("")); // ! not controlled search -> not cleared on click?
                  // -> so clear value inside Search w/ useRef manually when change category
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
