import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { differenceInMilliseconds, format, formatDuration } from 'date-fns';

import Button from '../../components/UI/Button/Button';
import classes from './History.module.css';

class History extends Component {
  componentDidMount() {
    this.props.fetchSupervisions(this.props.match.params.id, this.props.token);
  }
  render() {
    let soups = null;
    if (this.props.supervisions) {
      soups = this.props.supervisions.map((soup, index) => {
        const duration = differenceInMilliseconds(
          new Date(soup.end_time),
          new Date(soup.start_time)
        );
        let userOffset = new Date().getTimezoneOffset() * 60000; // to cancel out local UTC
        const formattedDur = format(duration + userOffset, 'H:m');
        const durOutput = formatDuration(
          {
            hours: parseInt(formattedDur.split(':')[0]),
            minutes: parseInt(formattedDur.split(':')[1]),
          },
          { format: ['hours', 'minutes'] }
        );
        return (
          <tr
            key={soup.id + index}
            className={index % 2 !== 0 ? classes.Alternate : null}
          >
            <td>{soup.date}</td>
            <td>{soup.supervisor.name}</td>
            <td>{durOutput}</td>
            <td>{soup.starting}</td>
            <td>{soup.conducting}</td>
            <td>{soup.ending}</td>
            <td>{soup.total}</td>
            <td>
              <Button>View</Button>
            </td>
          </tr>
        );
      });
    }

    console.log(this.props.match.params.id);
    return (
      <div className={classes.History}>
        <header>
          <h1>History</h1>
        </header>

        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Supervisor</td>
              <td>Duration</td>
              <td>Starting</td>
              <td>Conducting</td>
              <td>Ending</td>
              <td>Total</td>
              <td></td>
            </tr>
          </thead>
          <tbody>{soups}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    clinicId: state.auth.currentClinic,
    token: state.auth.token,
    supervisions: state.history.supervisions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSupervisions: (staffId) =>
      dispatch(actions.fetchSupervisions(staffId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
