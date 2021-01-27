import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../UI/Button/Button';
import classes from './StaffCard.module.css';

import AddMember from '../../containers/Roster/AddMember/AddMember';
const StaffCard = (props) => {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleStaffDelete = async (staffId) => {
    props.deleteMember(staffId, props.token);
  };
  const loading = props.loading;
  useEffect(() => {
    if (!loading) {
      setDeleting(false);
    }
  }, [loading]);
  return (
    <div className={classes.StaffCard}>
      {editing ? (
        <AddMember
          style={{ padding: 0, margin: 0 }}
          editing
          cancelEditing={() => setEditing(false)}
          staffId={props.staffId}
          memberData={{
            name: props.name,
            follow: props.inRoster,
            hours: props.hours,
          }}
        />
      ) : deleting ? (
        <React.Fragment>
          <p>
            All data, all supervisions for this user will be deleted
            permanently. Do you want to continue?
          </p>
          <Button
            type="button"
            clicked={() => handleStaffDelete(props.staffId)}
          >
            Yes
          </Button>
          <Button type="button" clicked={() => setDeleting(false)}>
            No
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span> {props.name}</span>
          {props.follow ? (
            <div>
              <Button clicked={props.handleFollow} btnType="NoBg">
                {props.inRoster ? 'Unfollow' : 'Follow'}
              </Button>
              <Button
                clicked={() => setEditing(true)}
                type="button"
                btnType="Transparent"
              >
                Edit
              </Button>
              <Button type="button" clicked={() => setDeleting(true)}>
                Delete
              </Button>
            </div>
          ) : null}
        </React.Fragment>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.allmembers.loading,
  };
};
export default connect(mapStateToProps)(StaffCard);
