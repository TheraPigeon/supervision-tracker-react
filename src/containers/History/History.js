import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { differenceInMilliseconds, formatDuration } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';

import ViewSoup from './ViewSoup/ViewSoup';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import classes from './History.module.css';
import Chart from '../../components/Chart/Chart';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewingSoup: false,
      deletingSoup: false,
      deleteSoupId: null,
      soupDate: null,
      soupId: null,
    };
  }
  componentDidMount() {
    this.props.fetchSupervisions(this.props.match.params.id, this.props.token);
  }
  // componentDidUpdate(prevProps) {
  //   // only do a review if a book is already available
  //   if (!prevProps.supervisions && this.props.supervisions) {
  //     // do a review mutation
  //     // client.mutate(...)
  //     this.forceUpdate();
  //   }
  // }
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
  handleDeleteModal = (soupData) => {
    if (!this.state.deletingSoup) {
      const { soupId, date } = soupData;
      this.setState((prevState) => {
        return {
          deletingSoup: !prevState.deletingSoup,
          deleteSoupId: soupId,
          soupDate: date,
        };
      });
    } else {
      this.setState((prevState) => {
        return { deletingSoup: !prevState.deletingSoup };
      });
    }
  };
  handleSoupDeletion = () => {
    this.props.onSoupDelete(this.state.deleteSoupId);
    this.handleDeleteModal();
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
            <td>
              <Button
                type="button"
                clicked={() =>
                  this.handleDeleteModal({ soupId: soupId, date: soup.date })
                }
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      });
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.viewingSoup}
          modalClosed={() => this.handleModal()}
        >
          <ViewSoup soupId={this.state.soupId} />
        </Modal>
        <Modal
          show={this.state.deletingSoup}
          modalClosed={() => this.handleDeleteModal()}
        >
          <div className={classes.DeleteSoup}>
            <p>
              Are you sure you want to delete supervision which was created on{' '}
              {this.state.soupDate}?
            </p>
            <div>
              <Button type="button" clicked={this.handleSoupDeletion}>
                Yes
              </Button>
              <Button
                type="button"
                btnType="Transparent"
                clicked={this.handleDeleteModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        <div className={classes.History}>
          <header>
            <h1>History</h1>
          </header>
          {this.props.supervisions ? (
            <Chart soups={this.props.supervisions} />
          ) : null}

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
    onSoupDelete: (soupId) => dispatch(actions.deleteSoup(soupId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
