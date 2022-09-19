import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/img/search-icon.svg";
import styles from "./Search.module.scss";

const Search = () => {
  return (
    <div className={styles.search}>
      <SearchIcon />
      <input type="text" placeholder="Search pizza" />
    </div>
  );
};

export default Search;
