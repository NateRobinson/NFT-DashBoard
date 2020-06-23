/* eslint-disable object-curly-newline */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';

import MiniPage from './pages/index';

export const App = () => (
  <React.Fragment>
    <div className="wrapper">
      <Switch>
        <Route exact path="/" component={MiniPage} />
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
