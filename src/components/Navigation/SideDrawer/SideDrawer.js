import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideSlider from './SideSlider/SideSlider';
import classes from './SideDrawer.module.css';

const sidedrawer = (props) => {
  const styleClasses = [classes.SideDrawer];
  if (props.showMenu) {
    styleClasses.push(classes.Open);
  }
  return (
    <div className={styleClasses.join(' ')}>
      <SideSlider />
      <div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </div>
  );
};

export default sidedrawer;
