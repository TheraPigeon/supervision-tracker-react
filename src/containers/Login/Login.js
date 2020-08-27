import React, { Component } from 'react';
import Auth from './Auth/Auth';
import ViewHistory from './ViewHistory/ViewHistory';
import classes from './Login.module.css';

class Login extends Component {
  render() {
    return (
      <div className={classes.Login}>
        <ViewHistory />
        <Auth />
      </div>
    );
  }
}

export default Login;
