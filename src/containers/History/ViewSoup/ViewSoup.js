import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format, getMilliseconds } from 'date-fns';

import { formatToTimeZone } from 'date-fns-timezone';
import * as actions from '../../../store/actions/index';

import ViewSection from './ViewSection/ViewSection';

class ViewSoup extends Component {
  componentDidUpdate = (prevState) => {
    if (this.props.soupId !== prevState.soupId) {
      this.props.onFetchSoup(this.props.soupId);
      console.log('[ViewSoup.js] - componentDidUpdate');
    }
  };

  render() {
    console.log(this.props.soup);
    let soup = null;
    if (this.props.soup) {
      const {
        date,
        start_time,
        end_time,
        group,
        telehealth,
        supervisor_id,
        staff_member_id,
        json,
      } = this.props.soup;
      const startTime = formatToTimeZone(new Date(start_time), 'HH:mm', {
        timeZone: 'Africa/Conakry',
      });
      const endTime = formatToTimeZone(new Date(end_time), 'HH:mm', {
        timeZone: 'Africa/Conakry',
      });
      const soupDate = format(new Date(date), 'MMM d, yyyy');

      const category = ['starting', 'main', 'ending', 'additional'];
      const soupSections = category.map((soupSection, i) => {
        return (
          <ViewSection
            key={soupSection + i}
            category={soupSection}
            questions={json}
          />
        );
      });
      soup = (
        <React.Fragment>
          <header>
            <div>
              <span>Date: {soupDate}</span>
              <span>Session started at: {startTime}</span>
              <span>Session ended at: {endTime}</span>
            </div>
            <div>
              <span>Session was performed in {group ? 'group' : 'solo'}</span>
              <span>
                It was conducted {telehealth ? 'remotely' : 'in-person'}
              </span>
              <span>Therapist: {supervisor_id}</span>
              <span>Clinician: {staff_member_id}</span>
            </div>
          </header>
          <section>
            <table>{soupSections}</table>
          </section>
        </React.Fragment>
      );
    }
    return <div>{soup}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    soup: state.history.soup,
  };
};

const mapDispatchToPropst = (dispatch) => {
  return {
    onFetchSoup: (soupId) => dispatch(actions.fetchSoup(soupId)),
  };
};

export default connect(mapStateToProps, mapDispatchToPropst)(ViewSoup);
