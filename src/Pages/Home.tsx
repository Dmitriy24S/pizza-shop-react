import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaList from "../components/PizzaList";
import SortDropdown from "../components/SortDropdown";

const Home = () => {
  const [categoryId, setCategoryId] = useState(0);

  const handleCategoryChange = (selectedCategoryId: number) => {
    setCategoryId(selectedCategoryId);
  };

  // scroll to top of page on page load (return from cart)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container__top">
        <Categories categoryId={categoryId} handleCategoryChange={handleCategoryChange} />
        <SortDropdown />
      </div>
      <PizzaList />
    </>
  );
};

export default Home;
