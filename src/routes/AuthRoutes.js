import React from 'react';
import { Home } from 'views/Home';
import { Login } from 'views/Login';
import { Register } from 'views/Register';
import { Profile } from 'views/Profile';
import { UpdatePassword } from 'views/UpdatePassword';
import { ForgotPassword } from 'views/ForgotPassword';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

export const AuthRoutes = () => {
  return (
    <React.Fragment>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/update-password" component={UpdatePassword} />
    </React.Fragment>
  )
}
