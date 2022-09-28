import React from "react";
import { createBrowserRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Cart from "./Pages/Cart";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Home from "./Pages/Home";
import PizzaSinglePage from "./Pages/PizzaSinglePage/PizzaSinglePage";
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        {/* <Outlet /> // New React Router option - show children components */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<PizzaSinglePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
