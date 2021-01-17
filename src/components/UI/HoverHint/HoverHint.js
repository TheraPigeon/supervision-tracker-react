import React from 'react';
import classes from './HoverHint.module.css';

const HoverHint = (props) => {
  return (
    <React.Fragment>
      {props.show ? (
        <div className={classes.HoverHint}>{props.message}</div>
      ) : null}
    </React.Fragment>
  );
};

export default HoverHint;
