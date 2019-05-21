import React from 'react';

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from '../components/Home/Home';
import Results from '../components/Results/Results';

class AppRouter extends React.PureComponent {

  render() {

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Results} />
          <Route path="/results" component={Results} />
          <Redirect path="/" />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
