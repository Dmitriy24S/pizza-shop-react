import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import "./scss/index.scss";

import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

// import Header from "./components/Header/Header";
// import Cart from "./Pages/Cart/Cart";
// import ErrorPage from "./Pages/ErrorPage/ErrorPage";
// import Home from "./Pages/Home/Home";

// New React Router?:
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "cart",
//         element: <Cart />,
//       },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <>
    {/* // <React.StrictMode> */}
    {/* New React Router?: */}
    {/* <RouterProvider router={router} /> */}

    {/* Redux wrapper */}
    <Provider store={store}>
      {/* Classic React Router: */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </React.StrictMode> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
