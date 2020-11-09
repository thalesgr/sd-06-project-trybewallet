import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';

function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
