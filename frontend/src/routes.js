import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Tipos from './pages/Tipos';
import Pokemon from './pages/Pokemons';
import {isAuth} from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Cadastro} />
        <PrivateRoute path="/pokemons" component={Pokemon} />
        <PrivateRoute path="/tipos" component={Tipos} />
      </Switch>
    </BrowserRouter>
  );
}