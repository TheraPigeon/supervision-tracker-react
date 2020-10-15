import React, { Component } from 'react';
import { connect } from 'react-redux';
import { differenceInMilliseconds, differenceInMinutes } from 'date-fns';

import classes from './Member.module.css';
import { NavLink } from 'react-router-dom';

class Member extends Component {
  state = {
    weeklyPercentage: 0,
    internMin: 0,
    latestScore: 'N/A',
  };
  componentDidMount() {
    const WEEKLY_GOAL = 120; // = 5% of 40 hours
    const currentWeekSoups = this.props.roster[
      this.props.memberId
    ].supervisions.filter((soup) => {
      const currDate = new Date();
      currDate.setHours(23);
      currDate.setMinutes(0);
      const first = currDate.getDate() - currDate.getDay();
      const firstday = new Date(currDate.setDate(first)).toUTCString();
      const diff = differenceInMilliseconds(
        new Date(soup.date),
        new Date(firstday)
      );
      return diff > 0;
    });
    currentWeekSoups.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    let completedMinutes = 0;
    let internMinutes = 0;
    currentWeekSoups.map((soup) => {
      const diff = differenceInMinutes(
        new Date(soup.end_time),
        new Date(soup.start_time)
      );
      completedMinutes += diff;
      if (soup.intern) {
        internMinutes += diff;
      }
    });
    const latestSoup = currentWeekSoups.slice(-1);
    if (latestSoup.length) {
      this.setState({ latestScore: latestSoup[0].total });
    }
    const percentage = (completedMinutes / WEEKLY_GOAL) * 100;
    this.setState({
      weeklyPercentage: parseFloat(percentage.toFixed(1)),
      internMin: internMinutes,
      // latestScore: currentWeekSoups.slice(-1)[0].total,
    });
  }

  render() {
    return (
      <section className={classes.Member}>
        <main>
          <span className={classes.Id}>{this.props.memberId}</span>

          <h3>{this.props.name}</h3>
        </main>
        <section>
          <NavLink
            to={{
              pathname: '/history/' + this.props.memberId,
              name: this.props.name,
            }}
          >
            View History
          </NavLink>
          <NavLink
            to={{
              pathname: '/soupervision/' + this.props.memberId,
              name: this.props.name,
            }}
          >
            Add Soup
          </NavLink>
        </section>

        <aside>
          <span>{this.state.weeklyPercentage}%</span>
          <span>{this.state.internMin}m</span>
          <span>{this.state.latestScore}</span>
        </aside>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roster: state.auth.roster,
  };
};
export default connect(mapStateToProps)(Member);
