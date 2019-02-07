import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Main from '../screens/Main';

const Routes = props => (
  <div id="body">
    <Switch>
      <Route exact path="/" component={Main} />
    </Switch>
  </div>
);

export default withRouter(Routes);
