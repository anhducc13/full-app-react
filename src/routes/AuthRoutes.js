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
      <PrivateRoute exact path="/trang-chu" component={Home} />
      <Route exact path="/dang-nhap" component={Login} />
      <Route exact path="/dang-ky" component={Register} />
      <Route exact path="/quen-mat-khau" component={ForgotPassword} />
      <PrivateRoute exact path="/trang-ca-nhan" component={Profile} />
      <PrivateRoute exact path="/doi-mat-khau" component={UpdatePassword} />
    </React.Fragment>
  )
}
