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
    console.log(staffId);
    if (!isInRoster) {
      this.props.addToRoster(staffId, this.props.token);
    }
  };
  render() {
    const categories = ['staff_members', 'supervisors'];
    let userListArray = [];
    let allMembers = null;
    let bcbaMembers = null;
    if (this.props.members) {
      categories.forEach((category) => {
        let roster = Object.keys(this.props.roster);
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
        allMembers = userListArray.map((member) => {
          if (member.category) {
            return member.category === 'staff_members' ? (
              <h2>RBT</h2>
            ) : (
              <h2>BCBA</h2>
            );
          }
          return (
            <StaffCard
              key={member.id}
              name={member.config.name || member.config.email}
              inRoster={member.inRoster}
              staffId={member.staffId}
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
    addToRoster: (staffId, token) => dispatch(actions.addStaff(staffId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMembers);
