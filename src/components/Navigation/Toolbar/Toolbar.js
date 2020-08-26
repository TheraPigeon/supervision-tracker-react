import React from 'react';

import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';

const toolbar = () => (
  <header className={classes.Toolbar}>
    <Logo />
    <span>Welcome, User!</span>
  </header>
);

export default toolbar;
