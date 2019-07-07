import React from 'react';
import { LoginForm } from 'components/LoginForm';
import { Auth } from 'helpers/auth';
import { Redirect } from 'react-router-dom';

export const Login = (props) => {
  return (
    <div>
      {Auth.isAuthenticated() ? (
        <Redirect to="/home" />
      ) : (
          <LoginForm {...props}/>
        )}
    </div>
  )
}
