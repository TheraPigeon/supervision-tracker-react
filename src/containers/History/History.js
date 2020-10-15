import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { differenceInMilliseconds, formatDuration } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';

import ViewSoup from './ViewSoup/ViewSoup';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import classes from './History.module.css';

class History extends Component {
  state = {
    viewingSoup: false,
    soupId: null,
  };
  componentDidMount() {
    this.props.fetchSupervisions(this.props.match.params.id, this.props.token);
  }
  shouldComponentUpdate = (nextState) => {
    if (this.state.soupId === nextState.soupId) {
      return false;
    }
    return true;
  };
  handleModal = (soupId) => {
    if (!this.state.viewingSoup) {
      //fetch one soup
      this.setState((prevState) => {
        return { viewingSoup: !prevState.viewingSoup, soupId: soupId };
      });
    } else {
      this.setState((prevState) => {
        return { viewingSoup: !prevState.viewingSoup };
      });
    }
  };
  render() {
    let soups = null;
    if (this.props.supervisions) {
      soups = this.props.supervisions.map((soup, index) => {
        const duration = differenceInMilliseconds(
          new Date(soup.end_time),
          new Date(soup.start_time)
        );
        const formattedDur = formatToTimeZone(new Date(duration), 'H:m', {
          timeZone: 'Africa/Conakry',
        });
        const durOutput = formatDuration(
          {
            hours: parseInt(formattedDur.split(':')[0]),
            minutes: parseInt(formattedDur.split(':')[1]),
          },
          { format: ['hours', 'minutes'] }
        );
        let soupId = soup.id;
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
              <Button
                type="button"
                btnType="Transparent"
                clicked={() => this.handleModal(soupId)}
              >
                View
              </Button>
            </td>
          </tr>
        );
      });
    }

    console.log(this.props.match.params.id);

    return (
      <React.Fragment>
        <Modal
          show={this.state.viewingSoup}
          modalClosed={() => this.handleModal()}
        >
          <ViewSoup soupId={this.state.soupId} />
        </Modal>
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
      </React.Fragment>
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
