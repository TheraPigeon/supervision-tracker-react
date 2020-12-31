import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideSlider from './SideSlider/SideSlider';
import Footer from '../../Footer/Footer';
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
        {/* <h2>Clinic Name</h2> */}
        <nav>
          <NavigationItems />
          <Footer />
        </nav>
      </div>
    </div>
  );
};

export default sidedrawer;
