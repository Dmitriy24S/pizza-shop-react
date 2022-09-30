import { useWhyDidYouUpdate } from "ahooks";
import debounce from "lodash.debounce";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/img/search-icon.svg";
import { handleSearch } from "../../redux/filterSlice";
import { RootState } from "../../redux/store";
// import { RootState } from "../../redux/store";

import styles from "./Search.module.scss";

const Search = () => {
  console.log("render SEARCH");

  const dispatch = useDispatch();
  const { searchInputValue, selectedCategoryId } = useSelector((state: RootState) => state.filter); // controlled input value
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = React.useCallback(
    debounce((searchInputValue) => {
      console.log("DEBOUNCE SEARCH");
      dispatch(handleSearch(searchInputValue.trim())); // remove extra white space?
    }, 500),
    []
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch(handleSearch(e.target.value));
    debouncedSearch(e.target.value);
  };

  // Clear controlled input value on X click and keep focus on input to type again:
  // const handleClearSearchInput = () => {
  //   dispatch(handleSearch(""));
  //   if (searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // };

  // Clear uncontrolled input value when click on category -> because no longer searching -> showing items/pizzas inside category unfiltered
  useEffect(() => {
    console.log(searchInputRef, "CLEARING SEARCH INPUT -> after Category selection");
    if (searchInputRef.current && selectedCategoryId !== 0) {
      // ! but if after search click All categories (which are already selected -> rightfuly will show All unfiltered pizza
      // ! -> but does not clear search input value)
      searchInputRef.current.value = "";
    }
  }, [selectedCategoryId, searchInputValue]);

  useWhyDidYouUpdate("Search", { selectedCategoryId, searchInputValue });

  return (
    <div className={styles.search}>
      <label htmlFor="search-input" className={styles.searchIcon}>
        <SearchIcon />
      </label>
      <input
        // value={searchInputValue}
        onChange={(e) => handleSearchInput(e)}
        ref={searchInputRef}
        // type="text"
        type="search"
        id="search-input"
        placeholder="Search pizza"
      />
      {/* // ! instead using html 'search' input for clear input X cross instead of controlled value for debounce ? */}
      {/* {searchInputValue && (
        <button
          aria-label="clear input"
          className={styles.closeIcon}
          onClick={handleClearSearchInput}
        >
          <CloseIcon />
        </button>
      )} */}
    </div>
  );
};

export default Search;
