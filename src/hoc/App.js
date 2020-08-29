import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from '../containers/Login/Auth/PrivateRoute/PrivateRoute';

import Layout from './Layout/Layout';
import Login from '../containers/Login/Login';
import Logout from '../containers/Login/Logout/Logout';
import Dashboard from '../containers/Dashboard/Dashboard';
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            {/* <Route path="/logout" component={Logout} /> */}
            <PrivateRoute
              auth={this.props.isAuthorized}
              path="/"
              exact
              component={Dashboard}
            />
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthorized: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(App);
