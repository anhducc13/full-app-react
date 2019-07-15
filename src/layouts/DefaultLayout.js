import React from 'react';
import { Home } from 'views/Home';
import { Profile } from 'views/Profile';
import { UpdatePassword } from 'views/UpdatePassword';
import { Route } from 'react-router-dom';
import { AuthHeaderBar } from '../components/shared/AuthHeader';

export const DefaultLayout = () => {
  return (
    <React.Fragment>
      <AuthHeaderBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/trang-chu" component={Home} />
      <Route exact path="/trang-ca-nhan" component={Profile} />
      <Route exact path="/doi-mat-khau" component={UpdatePassword} />
    </React.Fragment>
  )
}
