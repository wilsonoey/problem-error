// Import necessary dependencies

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Assume you have a function to check if the user is logged in

const isLoggedIn = () => {
  // Implement your logic to check if the user is logged in
  // For example, you can use localStorage, sessionStorage, or an authentication context
  return localStorage.getItem('accessToken') === 'true';
};


// Create a higher-order component (HOC) to check if the user is logged in
const isLogin = (WrappedComponent, redirectPath) => {
  return (props) => {
    const history = useNavigate();

    useEffect(() => {
      // Check if the user is logged in
      if (isLoggedIn()) {
        // Redirect to the specified path if the user is logged in
        history(redirectPath);
      }
    }, [history]);

    // Render the wrapped component
    return <WrappedComponent {...props} />;
  };

};

export default isLogin;