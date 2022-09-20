import React from "react";
import styles from "./Pagination.module.scss";

interface Props {
  numOfPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageChange: (num: number) => void;
}

const Pagination = ({ numOfPages, currentPage, setCurrentPage, handlePageChange }: Props) => {
  return (
    <div className={styles.pagination}>
      <ul>
        <li>
          <button
            className="btn--circle"
            onClick={() => {
              // decriment page
              if (currentPage > 1) {
                setCurrentPage((page) => page - 1);
              }
            }}
          >
            {"<"}
          </button>
        </li>
        {[...Array(numOfPages)].map((_page, index) => {
          const paginationPageNumber = index + 1;
          return (
            <li>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`btn--circle ${currentPage === paginationPageNumber ? "active" : ""}`}
              >
                {paginationPageNumber}
              </button>
            </li>
          );
        })}
        <li>
          <button
            className="btn--circle"
            onClick={() => {
              // increment page
              if (currentPage < numOfPages) {
                setCurrentPage((page) => page + 1);
              }
            }}
          >
            {">"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
