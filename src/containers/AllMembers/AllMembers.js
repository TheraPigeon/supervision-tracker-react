import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import StaffCard from '../../components/StaffCard/StaffCard';
import classes from './AllMembers.module.css';

class AllMembers extends Component {
  componentDidMount() {
    this.props.fetchMembers(this.props.clinicId, this.props.token);
  }
  componentDidUpdate(prevState) {
    if (this.props.clinicId !== prevState.clinicId) {
      this.props.fetchMembers(this.props.clinicId, this.props.token);
    }
  }
  handleRoster = (staffId, isInRoster) => {
    this.props.addToRoster(staffId, this.props.token, isInRoster);
  };
  render() {
    const categories = ['staff_members', 'supervisors'];
    let userListArray = [];
    let allMembers = null;
    if (this.props.members) {
      categories.forEach((category) => {
        let roster = [];
        if (this.props.roster) {
          roster = Object.keys(this.props.roster);
        }
        userListArray.push({
          category: category,
        });
        for (let key in this.props.members[category]) {
          let userId = this.props.members[category][key].id;
          userListArray.push({
            id: key,
            staffId: userId,
            inRoster: roster.includes(userId.toString()),
            rbt: category === 'staff_members' ? 1 : 0,
            config: this.props.members[category][key],
          });
        }
        allMembers = userListArray.map((member, i) => {
          if (member.category) {
            return member.category === 'staff_members' ? (
              <h2 key={category + i}>Therapists</h2>
            ) : (
              <h2 key={category + i}>Supervisors</h2>
            );
          }

          return (
            <StaffCard
              key={category + member.id + i}
              name={member.config.name || member.config.email}
              inRoster={member.inRoster}
              staffId={member.staffId}
              token={this.props.token}
              deleteMember={this.props.onDeleteStaff}
              handleFollow={() =>
                this.handleRoster(member.staffId, member.inRoster)
              }
              follow={member.rbt}
            />
          );
        });
      });
    }
    return (
      <div className={classes.AllMembers}>
        <header>
          <h1>Staff</h1>
        </header>
        {allMembers}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    members: state.allmembers.members,
    clinicId: state.auth.currentClinic,
    token: state.auth.token,
    roster: state.auth.roster,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembers: (clinicId, token) =>
      dispatch(actions.fetchMembers(clinicId, token)),
    addToRoster: (staffId, token, isFollowing) =>
      dispatch(actions.addStaff(staffId, token, isFollowing)),
    onDeleteStaff: (staffId, token) =>
      dispatch(actions.deleteStaff(staffId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMembers);
