import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Tipos from './pages/Tipos';
import Pokemon from './pages/Pokemons';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Cadastro} />
        <Route path="/pokemons" component={Pokemon} />
        <Route path="/tipos" component={Tipos} />
      </Switch>
    </BrowserRouter>
  );
}