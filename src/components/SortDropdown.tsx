import { useWhyDidYouUpdate } from "ahooks";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector } from "../redux/filter/selectors";
import { setSelectedSortOption, sortOptionsList } from "../redux/filter/slice";
// import { RootState } from "../redux/store";

// memo prevents extra rerender when typing in search?
const SortDropdown = React.memo(() => {
  console.log("render DROPDOWN");

  const dispatch = useDispatch();
  // const selectedSortOption = useSelector((state: RootState) => state.filter.selectedSortOption);
  const { selectedSortOption } = useSelector(filterSelector);
  // const [selectedSortOption, setSelectedSortOption] = useState(sortOptionsText[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside sort dropdown -> close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // console.log(event);
      // ! hacky workaround for path?:
      // const _event = event as MouseEvent & {
      //   path: Node[];
      // };
      // if (!event.path.includes(sortDropdownRef.current)) {
      // if (sortDropdownRef.current && !_event.path.includes(sortDropdownRef.current)) {
      // ! ^ not work with mobile tap outside
      if (!sortDropdownRef.current?.contains(event.target as Element)) {
        // ! ^ work on mobile tap outside
        // console.log("Click OUTSIDE of sortDropdown -> closing sortDropdown");
        setIsDropdownOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    // Cleanup click event:
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useWhyDidYouUpdate("SortDropdown", {
    isDropdownOpen,
    selectedSortOption,
    sortDropdownRef,
    sortOptionsList,
  });

  return (
    <div className="sort-dropdown" ref={sortDropdownRef}>
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
                    console.log(index, "sort index click");
                    // setSelectedSortOption(sortOptionsText[index]);
                    dispatch(setSelectedSortOption(index));
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
});

export default SortDropdown;
