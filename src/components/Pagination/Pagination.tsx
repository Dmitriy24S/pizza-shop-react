import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPage } from "../../redux/filterSlice";
import { RootState } from "../../redux/store";
import styles from "./Pagination.module.scss";

interface Props {
  numOfPages: number;
}

const Pagination = ({ numOfPages }: Props) => {
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);
  const dispatch = useDispatch();

  console.log("render Pagination");

  return (
    <div className={styles.pagination}>
      <ul>
        <li>
          <button
            className="btn--circle"
            onClick={() => {
              // decrement page
              if (currentPage > 1) {
                dispatch(updateCurrentPage(currentPage - 1));
              }
            }}
          >
            {"<"}
          </button>
        </li>
        {[...Array(numOfPages)].map((_page, index) => {
          const paginationPageNumber = index + 1;
          return (
            <li key={index}>
              <button
                onClick={() => dispatch(updateCurrentPage(paginationPageNumber))}
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
                dispatch(updateCurrentPage(currentPage + 1));
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
