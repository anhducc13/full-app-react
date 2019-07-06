import { Home } from 'components/Home';
import { Switch, Route } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes'

import React from 'react';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <AuthRoutes />
    </Switch>
  )
}
