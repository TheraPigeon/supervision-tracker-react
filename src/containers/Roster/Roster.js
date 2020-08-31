import React, { Component } from 'react';
import { connect } from 'react-redux';
import Member from './Member/Member';
import AddMember from './AddMember/AddMember';
import classes from './Roster.module.css';

class Roster extends Component {
  render() {
    console.log(this.props.roster);
    const roster = Object.keys(this.props.roster).map((member) => {
      console.log(member);
      const { name } = this.props.roster[member];
      return <Member key={member} memberId={member} name={name} />;
    });
    return (
      <div className={classes.Roster}>
        <h1>My Roster</h1>
        <AddMember />
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

export default connect(mapStateToProps)(Roster);
