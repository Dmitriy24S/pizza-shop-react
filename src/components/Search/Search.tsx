import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/img/close-icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/img/search-icon.svg";
import styles from "./Search.module.scss";

interface Props {
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchInputValue, setSearchInputValue }: Props) => {
  return (
    <div className={styles.search}>
      <label htmlFor="search-input" className={styles.searchIcon}>
        <SearchIcon />
      </label>
      <input
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
        type="text"
        id="search-input"
        placeholder="Search pizza"
      />
      {searchInputValue && (
        <button
          aria-label="clear input"
          className={styles.closeIcon}
          onClick={() => setSearchInputValue("")}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Search;
