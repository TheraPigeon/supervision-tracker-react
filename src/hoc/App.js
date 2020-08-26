import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout/Layout';
import Auth from '../containers/Auth/Auth';
import Dashboard from '../containers/Dashboard/Dashboard';
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            {/* <Route path="/logout" component={Logout} /> */}
            <Route path="/" exact component={Dashboard} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
