import React from 'react';
import Button from '../UI/Button/Button';
import classes from './StaffCard.module.css';
const StaffCard = (props) => {
  console.log(props.follow);
  return (
    <div className={classes.StaffCard}>
      <span> {props.name}</span>
      {props.follow ? (
        <Button clicked={props.handleFollow}>
          {props.inRoster ? 'Unfollow' : 'Follow'}
        </Button>
      ) : null}
    </div>
  );
};

export default StaffCard;
