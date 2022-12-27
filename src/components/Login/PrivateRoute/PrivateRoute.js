import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ children, ...rest }) => {
  const [loggedInUser] = useContext(UserContext);

  const navigate = useNavigate();
  const isLoggedIn = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp > currentTime;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (loggedInUser.email || isLoggedIn()) ? (
          children
        ) : (
          <navigate
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;