import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import InProgressCard from './InProgressCard/InProgressCard';
import * as actions from '../../store/actions/index';
import classes from './InProgress.module.css';

const InProgress = (props) => {
  const [soups, setSoups] = useState([]);
  const { members } = props;
  useEffect(() => {
    if (members) {
      const soups = [];
      members.forEach((member) => {
        return member.supervisions.forEach((soup) => {
          if (soup.in_progress) soups.push(soup);
        });
      });
      console.log(soups);
      setSoups(soups);
    }
  }, [members]);
  let inProgressList;
  if (soups) {
    inProgressList = soups.map((soup) => {
      return (
        <InProgressCard
          key={soup.id}
          soup={soup}
          userId={props.userId}
          deleteSoup={props.onDeleteSoup}
          token={props.token}
        />
      );
    });
  }
  return (
    <React.Fragment>
      {soups.length ? (
        <div className={classes.InProgress}>
          <h2>In progress supervisions:</h2>
          {inProgressList}
        </div>
      ) : null}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    members: state.allmembers.members.staff_members,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteSoup: (paramObj) => dispatch(actions.deleteSoup(paramObj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InProgress);
