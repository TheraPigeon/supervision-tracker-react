import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/roster">My Roster</NavigationItem>
    <NavigationItem link="/members">All staff</NavigationItem>
    <NavigationItem link="/new_feature">Request a feature</NavigationItem>

    <NavigationItem link="/logout">Logout</NavigationItem>
  </ul>
);

export default navigationItems;
