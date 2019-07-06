import React from 'react';
import { Login } from 'components/Login';
import { Register } from 'components/Register';
import { Profile } from 'components/Profile';
import { ResetPassword } from 'components/ResetPassword';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

export const AuthRoutes = () => {
  return (
    <div>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/reset-password" component={ResetPassword} />
    </div>
  )
}
