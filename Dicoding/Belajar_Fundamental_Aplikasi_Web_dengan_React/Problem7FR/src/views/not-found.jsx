import React from 'react';
import { Helmet } from 'react-helmet';

function NotFound() {
  return (
    <div className="not-found-container">
      <Helmet>
        <title>404 - Not Found</title>
      </Helmet>
      <h3>Oops! Page Not Found</h3>
      <div className="not-found-container1">
        <h1 className="not-found-text1">404</h1>
      </div>
      <div className="not-found-container2">
        <h2 className="not-found-text2">
          We are sorry, but the page you requested was not found
        </h2>
      </div>
    </div>
  )
}

export default NotFound;
