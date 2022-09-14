import React, { useState } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header/Header";
import PizzaList from "./components/PizzaList";
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
        <Categories categoryId={categoryId} handleCategoryChange={handleCategoryChange} />
        <PizzaList />
      </div>
    </div>
  );
}

export default App;
