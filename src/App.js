import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Connexion from './app/containers/Pages/Connexion'
function App(className) {
  return (
    <div className={className.className}>
      <Router>
            

          <Switch>
            <Route path="/about">

            </Route>
            <Route path="/users">

            </Route>
            <Route path="/">
              <Connexion/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
