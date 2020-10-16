import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideSlider from './SideSlider/SideSlider';
import classes from './SideDrawer.module.css';

const sidedrawer = (props) => (
  <div className={classes.SideDrawer}>
    <SideSlider />
    <div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  </div>
);

export default sidedrawer;
