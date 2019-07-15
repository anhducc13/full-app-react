import React from 'react';
import { useGlobal } from 'reactn';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Auth } from 'helpers/auth';
import { Login } from 'views/Login';
import { Register } from 'views/Register';
import { ForgotPassword } from 'views/ForgotPassword';
import { DefaultLayout } from './layouts/DefaultLayout';

toast.configure()

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

function App() {
  const [loading] = useGlobal('loading');

  return (
    <div className="App">
      {loading && (
        <div id="loader-wrapper">
          <div id="loader"></div>
        </div>
      )}
      <Router>
        <Switch>
          <Route exact path="/dang-nhap" component={Login} />
          <Route exact path="/dang-ky" component={Register} />
          <Route exact path="/quen-mat-khau" component={ForgotPassword} />
          <PrivateRoute path="/" component={DefaultLayout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
