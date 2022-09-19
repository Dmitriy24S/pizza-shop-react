import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/img/search-icon.svg";
import styles from "./Search.module.scss";

const Search = () => {
  return (
    <div className={styles.search}>
      <label htmlFor="search-input" className={styles.searchIcon}>
        <SearchIcon />
      </label>
      <input type="text" id="search-input" placeholder="Search pizza" />
      <button aria-label="clear input" className={styles.closeIcon}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Search;
