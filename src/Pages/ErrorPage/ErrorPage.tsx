import React from "react";
// import { useRouteError } from "react-router-dom";
import "./ErrorPage.scss";

const ErrorPage = () => {
  // const error = useRouteError() as any; // ?
  // console.error(error, "error page message");

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p id="error-message">{/* <i>{error.statusText || error.message}</i> */}</p>
    </div>
  );
};

export default ErrorPage;
