import React from 'react';
import Button from '../UI/Button/Button';
import classes from './StaffCard.module.css';
const StaffCard = (props) => {
  return (
    <div className={classes.StaffCard}>
      <span> {props.name}</span>
      <Button clicked={props.handleFollow}>
        {props.inRoster ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
};

export default StaffCard;
