import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from 'helpers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      (props) =>  
        Auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/dang-nhap',
                state: { from: props.location }
              }}
            />
          )
    } />
  )
}

export default PrivateRoute;