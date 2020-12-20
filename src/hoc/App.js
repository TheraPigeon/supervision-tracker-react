import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import PrivateRoute from '../containers/Login/Auth/PrivateRoute/PrivateRoute';

import Layout from './Layout/Layout';
import Login from '../containers/Login/Login';
import Logout from '../containers/Login/Logout/Logout';
import Roster from '../containers/Roster/Roster';
import AllMembers from '../containers/AllMembers/AllMembers';
import NewClinic from '../containers/NewClinic/NewClinic';
import NewSoup from '../containers/NewSoup/NewSoup';
import History from '../containers/History/History';
import Reset from '../containers/Login/Reset/Reset';
import NewPassword from '../containers/Login/Reset/NewPassword/NewPassword';

//For beta testing only
import NewFeature from '../components/Beta/NewFeature/NewFeature';
import BugReport from '../components/Beta/BugReport/BugReport';
// Date pickers
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// Date management
import DateFnsUtils from '@date-io/date-fns';

class App extends Component {
  componentDidMount = () => {
    this.props.onAutoSignin();
  };
  render() {
    let routes = (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/history/:id" component={History} />
        <Route path="/reset_password" component={Reset} />
        <Route path="/new_password" component={NewPassword} />
        <Redirect from="/" to="/login" />
      </Switch>
    );
    if (this.props.isAuthorized) {
      routes = (
        <Switch>
          {/* Public routes */}
          <Route path="/logout" component={Logout} />
          {/* History Route */}
          <Route path="/history/:id" component={History} />
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
            path="/new_feature"
            component={NewFeature}
          />
          <PrivateRoute
            auth={this.props.isAuthorized}
            path="/bug_report"
            component={BugReport}
          />
          <PrivateRoute
            auth={this.props.isAuthorized}
            path="/soupervision/:id"
            component={NewSoup}
          />
          <Redirect to="/roster" />
        </Switch>
      );
    }
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Layout>{routes}</Layout>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignin: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
