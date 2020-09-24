import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from '../containers/Login/Auth/PrivateRoute/PrivateRoute';

import Layout from './Layout/Layout';
import Login from '../containers/Login/Login';
import Logout from '../containers/Login/Logout/Logout';
import Dashboard from '../containers/Dashboard/Dashboard';
import Roster from '../containers/Roster/Roster';
import AllMembers from '../containers/AllMembers/AllMembers';
import NewClinic from '../containers/NewClinic/NewClinic';
import NewSoup from '../containers/NewSoup/NewSoup';

// Date pickers
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// Date management
import DateFnsUtils from '@date-io/date-fns';

class App extends Component {
  render() {
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Layout>
            <Switch>
              {/* Public routes */}
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              {/* Hitory Route */}
              {/* Authorization required */}
              <PrivateRoute
                auth={this.props.isAuthorized}
                path="/roster"
                component={Roster}
              />
              <PrivateRoute
                auth={this.props.isAuthorized}
                path="/members"
                component={AllMembers}
              />
              <PrivateRoute
                auth={this.props.isAuthorized}
                path="/join"
                component={NewClinic}
              />
              <PrivateRoute
                auth={this.props.isAuthorized}
                path="/soupervision/:id"
                component={NewSoup}
              />
              <PrivateRoute
                auth={this.props.isAuthorized}
                path="/"
                exact
                component={Dashboard}
              />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </MuiPickersUtilsProvider>
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
