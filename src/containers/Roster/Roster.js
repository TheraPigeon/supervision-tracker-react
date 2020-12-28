import React, { Component } from 'react';
import { connect } from 'react-redux';
import Member from './Member/Member';
import classes from './Roster.module.css';
import * as actions from '../../store/actions/index';

import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import AddMember from './AddMember/AddMember';
import StaffCard from '../../components/StaffCard/StaffCard';
import { withAuth0 } from '@auth0/auth0-react';
import Signup from '../Login/Signup/Signup';
class Roster extends Component {
  state = {
    managingStaff: false,
  };

  handleModal = () => {
    if (!this.state.managingStaff) {
      this.props.fetchMembers(this.props.clinicId, this.props.token);
    }
    this.setState((prevState) => {
      return { managingStaff: !prevState.managingStaff };
    });
  };
  handleRoster = (staffId, isFollow) => {
    this.props.addToRoster(staffId, this.props.token, isFollow);
  };
  render() {
    let roster = null;
    if (this.props.roster) {
      roster = Object.keys(this.props.roster).map((member) => {
        const { name } = this.props.roster[member];
        const { hours } = this.props.roster[member];
        return (
          <Member
            key={member}
            memberId={member}
            name={name}
            weeklyHours={hours}
          />
        );
      });
    }
    let listOfUsers = null;
    let userListArray = [];
    if (this.props.members.staff_members) {
      let roster = [];
      if (this.props.roster) {
        roster = Object.keys(this.props.roster);
      }
      for (let key in this.props.members.staff_members) {
        let userId = this.props.members.staff_members[key].id;
        userListArray.push({
          id: key,
          staffId: userId,
          inRoster: roster.includes(userId.toString()),
          config: this.props.members.staff_members[key],
        });
      }
      listOfUsers = userListArray.map((member) => {
        return (
          <StaffCard
            key={member.id}
            name={member.config.name}
            hours={member.config.hours}
            inRoster={member.inRoster}
            staffId={member.staffId}
            deleteMember={this.props.onDeleteStaff}
            token={this.props.token}
            handleFollow={() =>
              this.handleRoster(member.staffId, member.inRoster)
            }
            follow
          />
        );
      });
    }
    // if (!this.props.clinics.length) {
    //   this.props.history.push('/join');
    // }
    const currentClinicData = this.props.clinics.filter((clinic) => {
      return clinic.id === this.props.clinicId;
    });
    let clinicName = null;
    if (currentClinicData[0]) {
      clinicName = currentClinicData[0].name;
    }
    return (
      <React.Fragment>
        <Modal show={this.state.managingStaff} modalClosed={this.handleModal}>
          <AddMember />
          {listOfUsers}
        </Modal>
        <Modal show={!this.props.profileCompleted} noscroll>
          <Signup />
        </Modal>
        <div className={classes.Roster}>
          <header>
            <h1>
              My {clinicName} Roster -ID: {this.props.clinicId}
            </h1>
            <Button clicked={this.handleModal}>
              <i className="fa fa-cog"></i>Manage
            </Button>
          </header>
          {roster}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roster: state.auth.roster,
    members: state.allmembers.members,
    clinicId: state.auth.currentClinic,
    token: state.auth.token,
    clinics: state.auth.clinics,
    profileCompleted: !state.auth.hasCompletedProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembers: (clinicId, token) =>
      dispatch(actions.fetchMembers(clinicId, token)),
    addToRoster: (staffId, token, isFollow) =>
      dispatch(actions.addStaff(staffId, token, isFollow)),
    onDeleteStaff: (staffId, token) =>
      dispatch(actions.deleteStaff(staffId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth0(Roster));
