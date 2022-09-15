import React, { useState } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header/Header";
import PizzaList from "./components/PizzaList";
import SortDropdown from "./components/SortDropdown";
import "./scss/app.scss";

function App() {
  const [categoryId, setCategoryId] = useState(0);

  const handleCategoryChange = (selectedCategoryId: number) => {
    setCategoryId(selectedCategoryId);
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="container__top">
          <Categories categoryId={categoryId} handleCategoryChange={handleCategoryChange} />
          <SortDropdown />
        </div>
        <PizzaList />
      </div>
    </div>
  );
}

export default App;
