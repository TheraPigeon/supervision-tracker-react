import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format, getMilliseconds } from 'date-fns';
import { NavLink } from 'react-router-dom';

import { formatToTimeZone } from 'date-fns-timezone';
import * as actions from '../../../store/actions/index';

import classes from './ViewSoup.module.css';
import ViewSection from './ViewSection/ViewSection';
import Button from '../../../components/UI/Button/Button';
class ViewSoup extends Component {
  componentDidUpdate = (prevState) => {
    if (this.props.soupId !== prevState.soupId) {
      this.props.onFetchSoup(this.props.soupId);
      console.log('[ViewSoup.js] - componentDidUpdate');
    }
  };
  handleEdit = () => {
    const link = `/soupervision/${this.props.soupId}`;
    console.log(link);
    // return <Redirect to={link} />;
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
        starting,
        conducting,
        ending,
        total,
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
      const score = [starting, conducting, ending];
      const soupSections = category.map((soupSection, i) => {
        return (
          <ViewSection
            key={soupSection + i}
            category={soupSection}
            questions={json}
            score={score[i]}
          />
        );
      });
      soup = (
        <div className={classes.ViewSoup}>
          <div className={classes.Controls}>
            <NavLink
              to={{
                pathname: '/soupervision/' + staff_member_id,
                name: staff_member_id,
                controls: json,
                edit: true,
              }}
            >
              <Button btnType="Transparent" clicked={this.handleEdit}>
                Edit
              </Button>
            </NavLink>

            <Button btnType="Transparent">Print(PDF)</Button>
            <Button>Delete</Button>
          </div>
          <header>
            <div>
              <span>Therapist: {supervisor_id}</span>
              <span>Clinician: {staff_member_id}</span>
              <span>
                Note: Session was conducted{' '}
                {telehealth ? 'remotely' : 'in-person'} and in{' '}
                {group ? 'group' : 'solo'}
              </span>
            </div>
            <div>
              <span>Date: {soupDate}</span>
              <span>Session started at: {startTime}</span>
              <span>Session ended at: {endTime}</span>
            </div>
          </header>
          <section>
            <table>{soupSections}</table>
          </section>
        </div>
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