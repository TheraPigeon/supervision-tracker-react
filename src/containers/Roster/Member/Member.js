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
    if (this.props.roster[this.props.memberId].supervisions) {
      this.updateCircleItems();
    }
  };
  handleHover = (category) => {
    this.setState({ showHint: category });
  };

  updateCircleItems() {
    const WEEKLY_GOAL = this.props.weeklyHours * 0.05 * 60; // = 5% of weekly hours
    const currentWeekSoups = this.props.roster[
      this.props.memberId
    ].supervisions.filter((soup) => {
      const currDate = new Date();
      currDate.setHours(1);
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
      console.log(soup);
      if (soup.intern) {
        internMinutes += diff;
      } else {
        completedMinutes += diff;
      }
      return true;
    });
    if (currentWeekSoups.length) {
      this.setState({ latestScore: currentWeekSoups[0].total });
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
        content: `${this.state.internMin}m%`,
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
  };
};
export default connect(mapStateToProps)(Member);
