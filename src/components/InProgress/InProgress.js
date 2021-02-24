import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const InProgress = (props) => {
  useEffect(() => {
    if (props.members) {
      const soups = [];
      props.members.forEach((member) => {
        return member.supervisions.forEach((soup) => {
          if (soup.in_progress) soups.push(soup);
        });
      });
      console.log(soups);
    }
  });
  return <div>In Progress</div>;
};

const mapStateToProps = (state) => {
  return {
    members: state.allmembers.members.staff_members,
  };
};

export default connect(mapStateToProps)(InProgress);
