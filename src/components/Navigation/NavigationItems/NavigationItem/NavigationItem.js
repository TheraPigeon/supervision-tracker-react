import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
  const activeStyle = {
    backgroundColor: '#fff',
  };
  const active = document.getElementsByClassName('active');
  console.log(active);
  if (active.length > 0) {
    console.log(active);
    active[0].parentNode.style = activeStyle;
  }
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        exact={props.exact}
        activeClassName={classes.active}
        to={props.link}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
