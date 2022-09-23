import debounce from "lodash.debounce";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/img/search-icon.svg";
import { handleSearch } from "../../redux/filterSlice";
// import { RootState } from "../../redux/store";

import styles from "./Search.module.scss";

const Search = () => {
  console.log("render SEARCH");

  const dispatch = useDispatch();
  // const searchInputValue = useSelector((state: RootState) => state.filter.searchInputValue); // controlled input value
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = React.useCallback(
    debounce((searchInputValue) => {
      console.log("DEBOUNCE SEARCH");
      dispatch(handleSearch(searchInputValue));
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
