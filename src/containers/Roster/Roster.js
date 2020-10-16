import React, { Component } from 'react';
import { connect } from 'react-redux';
import Member from './Member/Member';
import classes from './Roster.module.css';
import * as actions from '../../store/actions/index';

import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import AddMember from './AddMember/AddMember';
import StaffCard from '../../components/StaffCard/StaffCard';

class Roster extends Component {
  state = {
    managingStaff: false,
  };
  componentDidMount = () => {
    console.log('[Roster.js] componentDidMount');
  };
  handleModal = () => {
    if (!this.state.managingStaff) {
      this.props.fetchMembers(this.props.clinicId, this.props.token);
    }
    this.setState((prevState) => {
      return { managingStaff: !prevState.managingStaff };
    });
  };
  handleRoster = (staffId, isInRoster) => {
    if (!isInRoster) {
      this.props.addToRoster(staffId, this.props.token);
    }
  };
  render() {
    let roster = null;
    if (this.props.roster) {
      roster = Object.keys(this.props.roster).map((member) => {
        const { name } = this.props.roster[member];
        return <Member key={member} memberId={member} name={name} />;
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
            inRoster={member.inRoster}
            staffId={member.staffId}
            handleFollow={() =>
              this.handleRoster(member.staffId, member.inRoster)
            }
            follow
          />
        );
      });
    }
    return (
      <React.Fragment>
        <Modal show={this.state.managingStaff} modalClosed={this.handleModal}>
          <AddMember />
          {listOfUsers}
        </Modal>
        <div className={classes.Roster}>
          <header>
            <h1>My Roster</h1>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrectClinic: dispatch(actions.setCurrentClinic),
    fetchMembers: (clinicId, token) =>
      dispatch(actions.fetchMembers(clinicId, token)),
    addToRoster: (staffId, token) => dispatch(actions.addStaff(staffId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
