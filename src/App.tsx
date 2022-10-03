import React, { Suspense } from "react";
import Loadable from "react-loadable";
import { createBrowserRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
// import Home from "./Pages/Home";
// import Cart from "./Pages/Cart";
// import PizzaSinglePage from "./Pages/PizzaSinglePage/PizzaSinglePage";
// import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import "./scss/app.scss";

// browser side - react lazy
const Home = React.lazy(() => import(/* webpackChunkName: 'Home' */ "./Pages/Home"));
const PizzaSinglePage = React.lazy(
  () => import(/* webpackChunkName: 'PizzaSinglePage' */ "./Pages/PizzaSinglePage/PizzaSinglePage")
);
const ErrorPage = React.lazy(
  () => import(/* webpackChunkName: 'ErrorPage' */ "./Pages/ErrorPage/ErrorPage")
);
// const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart' */ "./Pages/Cart"));

// server side rendering - react loadable
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: 'Cart' */ "./Pages/Cart"),
  loading: () => <h1>Loading your cart</h1>,
});

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        {/* <Outlet /> // New React Router option - show children components */}
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="cart"
            element={
              <Suspense>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="pizza/:id"
            element={
              <Suspense fallback={<h1>Loading pizza</h1>}>
                <PizzaSinglePage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense>
                <ErrorPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
