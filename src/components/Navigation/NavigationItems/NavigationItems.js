import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/roster" toggleMenu={props.toggleMenu}>
      My Roster
    </NavigationItem>
    <NavigationItem link="/members" toggleMenu={props.toggleMenu}>
      All staff
    </NavigationItem>

    <NavigationItem link="/new_feature" toggleMenu={props.toggleMenu}>
      Request a feature
    </NavigationItem>
    <NavigationItem link="/bug_report" toggleMenu={props.toggleMenu}>
      Report a bug
    </NavigationItem>
    <NavigationItem link="/logout" toggleMenu={props.toggleMenu}>
      Logout
    </NavigationItem>
  </ul>
);

export default navigationItems;
