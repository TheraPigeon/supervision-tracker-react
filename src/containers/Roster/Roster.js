import React, { Component } from 'react';
import { connect } from 'react-redux';
import Member from './Member/Member';
import AddMember from './AddMember/AddMember';
import classes from './Roster.module.css';
import * as actions from '../../store/actions/index';

class Roster extends Component {
  componentDidMount() {}
  render() {
    const roster = Object.keys(this.props.roster).map((member) => {
      const { name } = this.props.roster[member];
      return <Member key={member} memberId={member} name={name} />;
    });
    return (
      <div className={classes.Roster}>
        <header>
          <h1>My Roster</h1>
          <AddMember />
        </header>

        {roster}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roster: state.auth.roster,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrectClinic: dispatch(actions.setCurrentClinic),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
