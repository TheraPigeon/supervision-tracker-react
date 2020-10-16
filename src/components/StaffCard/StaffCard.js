import React from 'react';
import Button from '../UI/Button/Button';
import classes from './StaffCard.module.css';
const StaffCard = (props) => {
  return (
    <div className={classes.StaffCard}>
      <span> {props.name}</span>
      {props.follow ? (
        <Button clicked={props.handleFollow} btnType="NoBg">
          {props.inRoster ? 'Unfollow' : 'Follow'}
        </Button>
      ) : null}
    </div>
  );
};

export default StaffCard;
