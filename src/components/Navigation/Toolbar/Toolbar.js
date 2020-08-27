import React from 'react';

import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Logo />
    {props.isAuth ? <span>Welcome, User!</span> : null}
  </header>
);

export default toolbar;
