/* eslint-disable object-curly-newline */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';

import MiniPage from './pages/index';
import IssuerPage from './pages/issuers';
import TypePage from './pages/types';
import SortPage from './pages/sorts';
import './App.css';

export const App = () => (
  <React.Fragment>
    <div className="wrapper">
      <Switch>
        <Route exact path="/" component={MiniPage} />
        <Route exact path="/issuers" component={IssuerPage} />
        <Route exact path="/types" component={TypePage} />
        <Route exact path="/sorts" component={SortPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  </React.Fragment>
);

const WrappedApp = withRouter(App);

export default () => (
  <Router>
    <WrappedApp />
  </Router>
);
