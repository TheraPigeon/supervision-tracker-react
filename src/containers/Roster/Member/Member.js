import React, { Component } from 'react';
import { connect } from 'react-redux';
import { differenceInMilliseconds, differenceInMinutes } from 'date-fns';
import classes from './Member.module.css';
import { NavLink } from 'react-router-dom';
import HoverHint from '../../../components/UI/HoverHint/HoverHint';
class Member extends Component {
  state = {
    weeklyPercentage: 0,
    internMin: 0,
    latestScore: 'N/A',
    showHint: false,
  };
  componentDidMount = () => {
    if (this.props.members.staff_members[this.props.memberIndex].supervisions) {
      this.updateCircleItems();
    }
  };
  componentDidUpdate = (prevProps) => {
    if (
      this.props.members.staff_members[this.props.memberIndex].supervisions !==
      prevProps.members.staff_members[prevProps.memberIndex].supervisions
    ) {
      this.updateCircleItems();
    }
  };
  handleHover = (category) => {
    this.setState({ showHint: category });
  };

  updateCircleItems() {
    const WEEKLY_GOAL = this.props.weeklyHours * 0.05 * 60; // = 5% of weekly hours
    const thisMember = this.props.members.staff_members[this.props.memberIndex];
    const currentWeekSoups = thisMember.supervisions.filter((soup) => {
      const currDate = new Date();
      currDate.setHours(1);
      currDate.setMinutes(0);
      const first = currDate.getDate() - currDate.getDay();
      const firstday = new Date(currDate.setDate(first)).toUTCString();
      const diff = differenceInMilliseconds(
        new Date(soup.date),
        new Date(firstday)
      );
      return diff > 0 && !soup.in_progress; //TEST
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
      if (soup.intern) {
        internMinutes += diff;
      } else {
        completedMinutes += diff;
      }
      return true;
    });
    if (currentWeekSoups.length) {
      const score = currentWeekSoups[0].total;
      this.setState({ latestScore: score });
    }
    let percentage = (completedMinutes / WEEKLY_GOAL) * 100;
    if (percentage > 100) {
      percentage = 100;
    } else if (percentage < 0) {
      percentage = 0;
    }
    this.setState({
      weeklyPercentage: parseFloat(percentage.toFixed(1)),
      internMin: internMinutes,
      // latestScore: currentWeekSoups.slice(-1)[0].total,
    });
  }

  render() {
    const cardBgColor =
      this.state.weeklyPercentage < 50
        ? classes.Red
        : this.state.weeklyPercentage === 100
        ? classes.Green
        : this.state.weeklyPercentage >= 50
        ? classes.Yellow
        : null;
    const styleClasses = [classes.Member, cardBgColor].join(' ');
    const circleItemsConfig = [
      {
        type: 'goal',
        content: `${this.state.weeklyPercentage}%`,
        hintMessage: 'Weekly goal',
      },
      {
        type: 'intern',
        content: `${this.state.internMin}m`,
        hintMessage: 'Supervision time conducted by an intern',
      },
      {
        type: 'total',
        content: this.state.latestScore,
        hintMessage: 'Total score on the latest supervision',
      },
    ];
    const circleItems = circleItemsConfig.map((circle, i) => {
      return (
        <span
          key={circle.type + i}
          onMouseEnter={() => this.handleHover(circle.type)}
          onMouseOut={this.handleHover}
        >
          {circle.content}
          <HoverHint
            key={i}
            show={this.state.showHint === circle.type}
            message={circle.hintMessage}
          />
        </span>
      );
    });

    return (
      <section className={styleClasses}>
        <main>
          <span className={classes.Id}>{this.props.memberId}</span>

          <h3>{this.props.name}</h3>
        </main>
        <section>
          <div className={classes.AddBtn}>
            <span>
              <NavLink
                to={{
                  pathname: '/soupervision/' + this.props.memberId,
                  name: this.props.name,
                }}
              >
                <span></span>
                Add Soup
              </NavLink>
            </span>
          </div>
          <NavLink
            to={{
              pathname: '/history/' + this.props.memberId,
              name: this.props.name,
            }}
          >
            View History
          </NavLink>
        </section>

        <aside>{circleItems}</aside>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roster: state.auth.roster,
    members: state.allmembers.members,
  };
};
export default connect(mapStateToProps)(Member);
