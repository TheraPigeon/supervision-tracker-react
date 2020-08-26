import React from 'react';

import soupLogo from '../../assets/images/';
import classes from './Logo.module.css';
const logo = () => (
  <div className={classes.Logo}>
    <img src={soupLogo} alt="Soup logo" />
  </div>
);

export default logo;
