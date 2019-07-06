import React from 'react';
import { Home } from 'components/Home';
import { Login } from 'components/Login';
import { Register } from 'components/Register';
import { Profile } from 'components/Profile';
import { ResetPassword } from 'components/ResetPassword';
import { ForgotPassword } from 'components/ForgotPassword';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

export const AuthRoutes = () => {
  return (
    <div>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/reset-password" component={ResetPassword} />
    </div>
  )
}
