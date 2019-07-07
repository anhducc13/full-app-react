import { BrowserRouter as Router,  Switch } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';

import React from 'react';

export const AppRoutes = () => {
  return (
    <Switch>
      <AuthRoutes />
    </Switch>
  )
}
