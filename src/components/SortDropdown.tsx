import React, { useState } from "react";

const sortOptionsList = [
  { id: 0, name: "By Popularity (ASC.)", sort: "rating", order: "asc" },
  { id: 1, name: "By Popularity (DESC.)", sort: "rating", order: "desc" },
  { id: 2, name: "By Price (ASC.)", sort: "price", order: "asc" },
  { id: 3, name: "By Price (DESC.)", sort: "price", order: "desc" },
  { id: 4, name: "By Name (ASC.)", sort: "title", order: "asc" },
  { id: 5, name: "By Name (DESC.)", sort: "title", order: "desc" },
];
// ! REPEAT - TODO: refactor! (Home + SortDropdown)

interface SelectedSortOptionType {
  id: number;
  name: string;
  sort: string;
  order: string;
}

interface Props {
  selectedSortOption: SelectedSortOptionType;
  setSelectedSortOption: React.Dispatch<React.SetStateAction<SelectedSortOptionType>>;
}

const SortDropdown = ({ selectedSortOption, setSelectedSortOption }: Props) => {
  // const [selectedSortOption, setSelectedSortOption] = useState(sortOptionsText[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="sort-dropdown">
      <button className="sort-dropdown__btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {/* chevron svg */}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sort-dropdown__btn-chevron"
          transform={!isDropdownOpen ? "rotate(-180)" : ""}
          //   style={{ transform: `${!isDropdownOpen ? "rotate(-180deg)" : ""}` }}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          ></path>
        </svg>
        <span className="sort-dropdown__btn-text">{selectedSortOption.name}</span>
      </button>

      {/* dropdown */}
      {isDropdownOpen && (
        <div className="sort-dropdown__options">
          <ul>
            {/* {sortOptionsText.map((optionText, index) => ( */}
            {sortOptionsList.map((option, index) => (
              <li key={option.name}>
                <button
                  className={selectedSortOption.name === option.name ? "active" : ""}
                  onClick={() => {
                    console.log(index, "sort index");
                    // setSelectedSortOption(sortOptionsText[index]);
                    setSelectedSortOption(sortOptionsList[index]);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
