import React, { useState } from 'react';
import classes from './InProgressCard.module.css';
import { NavLink } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { formatToTimeZone } from 'date-fns-timezone';

const InProgressCard = (props) => {
  const [discarding, setDiscarding] = useState(false);
  const createdAtTime = formatToTimeZone(
    new Date(props.soup.created_at),
    'MMM D, YYYY',
    {
      timeZone: 'Africa/Conakry',
    }
  );
  return (
    <div className={classes.InProgressCard}>
      {!discarding ? (
        <React.Fragment>
          <span className={classes.Id}>{props.soup.staff_member_id}</span>
          <span>Last updated: {createdAtTime}</span>
          <NavLink
            to={{
              pathname: `/soupervision/${props.soup.id}`,
              search: 'edit=true',
              soupId: props.soup.id,
              edit: true,
              userId: props.userId,
              name: props.soup.staff_member_id,
            }}
          >
            <Button type="button" btnType="Transparent">
              continue
            </Button>
          </NavLink>
          <Button
            type="button"
            btnType="NoBg"
            clicked={() => setDiscarding(!discarding)}
          >
            discard
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span>Are you sure?</span>
          <Button btnType="NoBg" type="button">
            yes
          </Button>
          <Button
            btnType="Transparent"
            type="button"
            clicked={() => setDiscarding(!discarding)}
          >
            no
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default InProgressCard;
