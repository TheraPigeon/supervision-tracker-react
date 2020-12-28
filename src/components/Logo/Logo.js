import React from 'react';

// import soupLogo from '../../assets/images/';
import classes from './Logo.module.css';

// const soupLogo =
//   'https://cdn.dribbble.com/users/654369/screenshots/1855571/untitled-4.png';
const logo = (props) => {
  const style = props.authed
    ? {
        color: '#777',
        webkitTextFillColor: 'unset',
        background: 'transparent',
      }
    : null;
  return (
    <div className={classes.Logo}>
      {/* <img src={soupLogo} alt="Soup logo" /> */}
      <h1>
        SOUP <span style={style}>by TheraPigeon&#8482;</span>
      </h1>
    </div>
  );
};

export default logo;
