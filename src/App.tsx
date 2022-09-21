import React, { useState } from "react";
import { createBrowserRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Cart from "./Pages/Cart";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Home from "./Pages/Home";
import "./scss/app.scss";

export interface ContextType {
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchContext = React.createContext({});

function App() {
  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchInputValue, setSearchInputValue }}>
        <Header />
        <div className="container">
          {/* <Outlet /> // New React Router option - show children components */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
