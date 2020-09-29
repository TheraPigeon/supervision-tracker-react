import React, { Component } from 'react';
import { connect } from 'react-redux';
import Member from './Member/Member';
import classes from './Roster.module.css';
import * as actions from '../../store/actions/index';

import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import AddMember from './AddMember/AddMember';

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
    console.log('handleModal');
  };
  render() {
    let roster = null;
    if (this.props.roster) {
      roster = Object.keys(this.props.roster).map((member) => {
        const { name } = this.props.roster[member];
        return <Member key={member} memberId={member} name={name} />;
      });
    }
    // let listOfUsers = this.props.members.staff_members
    let listOfUsers = null;
    let userListArray = [];
    if (this.props.members.staff_members) {
      let roster = Object.keys(this.props.roster);
      for (let key in this.props.members.staff_members) {
        let userId = this.props.members.staff_members[key].id;
        console.log(roster.includes(userId.toString()));
        userListArray.push({
          id: key,
          inRoster: roster.includes(userId.toString()),
          config: this.props.members.staff_members[key],
        });
      }
      console.log(this.props.members);
      listOfUsers = userListArray.map((member) => {
        return (
          <div key={member.id}>
            {member.config.name}
            <Button>Edit</Button>
            <Button>{member.inRoster ? 'Unfollow' : 'Follow'}</Button>
          </div>
        );
      });
    }

    console.log(listOfUsers);

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
