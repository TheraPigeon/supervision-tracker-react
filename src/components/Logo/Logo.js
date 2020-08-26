import React from 'react';

// import soupLogo from '../../assets/images/';
import classes from './Logo.module.css';

const soupLogo =
  'https://cdn.dribbble.com/users/654369/screenshots/1855571/untitled-4.png';
const logo = () => (
  <div className={classes.Logo}>
    <img src={soupLogo} alt="Soup logo" />
  </div>
);

export default logo;
