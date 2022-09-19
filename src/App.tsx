import React, { useState } from "react";
import { createBrowserRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Cart from "./Pages/Cart";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Home from "./Pages/Home";
import "./scss/app.scss";

function App() {
  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <div className="wrapper">
      <Header searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue} />
      <div className="container">
        {/* <Outlet /> // New React Router option - show children components */}
        <Routes>
          <Route
            path="/"
            element={
              <Home searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue} />
            }
          />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
