import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ auth: isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
