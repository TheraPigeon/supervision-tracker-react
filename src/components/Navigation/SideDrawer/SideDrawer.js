import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import AddMember from '../../../containers/Roster/AddMember/AddMember';
const sidedrawer = (props) => (
  <div className={classes.SideDrawer}>
    <div className={classes.AddClinic}>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div>
      <AddMember />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  </div>
);

export default sidedrawer;
