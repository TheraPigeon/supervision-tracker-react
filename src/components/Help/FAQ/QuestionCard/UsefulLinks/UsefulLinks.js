import React from 'react';
import classes from './UsefulLinks.module.css';
import { Link } from 'react-router-dom';

const UsefulLinks = ({ links }) => {
  if (links.length > 0) {
    return (
      <div className={classes.UsefulLinks}>
        {links.map((link) => {
          return (
            <Link to={link.path}>
              <button>{link.title}</button>
            </Link>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default UsefulLinks;
