import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/img/search-icon.svg";
import { handleSearch } from "../../redux/filterSlice";
import { RootState } from "../../redux/store";

import styles from "./Search.module.scss";

const Search = () => {
  const searchInputValue = useSelector((state: RootState) => state.filter.searchInputValue);
  const dispatch = useDispatch();

  console.log("render SEARCH");

  return (
    <div className={styles.search}>
      <label htmlFor="search-input" className={styles.searchIcon}>
        <SearchIcon />
      </label>
      <input
        value={searchInputValue}
        onChange={(e) => dispatch(handleSearch(e.target.value))}
        type="text"
        id="search-input"
        placeholder="Search pizza"
      />
      {searchInputValue && (
        <button
          aria-label="clear input"
          className={styles.closeIcon}
          onClick={() => {
            dispatch(handleSearch(""));
          }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Search;
