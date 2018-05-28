import React, { Component } from "react";
import "./App.css";
import { Comunicados } from './views/components/Comunicados';
import { Router, Route, Switch } from 'react-router';
import indexRoutes from './routes/index';
import createBrowserHistory from '../node_modules/history/createBrowserHistory';
//'history/lib/createBrowserHistory'
var hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} key={key} component={prop.component} />;
          })}
        </Switch>
      </Router>
    );
  }
}
export default App;