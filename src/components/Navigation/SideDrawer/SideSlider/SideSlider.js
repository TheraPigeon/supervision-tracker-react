import React from 'react';
import { connect } from 'react-redux';
import classes from './SideSlider.module.css';
import * as actions from '../../../../store/actions/index';
import { NavLink } from 'react-router-dom';
const sideslider = (props) => {
  const clinicLinks = props.clinics.map((clinic) => {
    const clinicId = clinic.id;
    return (
      <span
        className={props.currentClinic === clinic.id ? classes.active : null}
        key={clinic.id}
        onClick={() => props.setClinic(clinicId)}
      >
        {clinic.id}
      </span>
    );
  });
  return (
    <div className={classes.SideSlider}>
      {clinicLinks}
      <span
        onClick={() => props.setClinic(5)}
        className={props.currentClinic === 5 ? classes.active : null}
      >
        5
      </span>
      <span>
        <NavLink to="join">
          <i className="fa fa-plus"></i>
        </NavLink>
      </span>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    clinics: state.auth.clinics,
    currentClinic: state.auth.currentClinic,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setClinic: (clinicId) => dispatch(actions.setCurrentClinic(clinicId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(sideslider);
