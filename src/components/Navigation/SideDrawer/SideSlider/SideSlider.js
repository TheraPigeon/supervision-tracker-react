import React from 'react';
import { connect } from 'react-redux';
import classes from './SideSlider.module.css';
import * as actions from '../../../../store/actions/index';
import { NavLink } from 'react-router-dom';
const sideslider = (props) => {
  const clinicLinks = props.clinics.map((clinic, i) => {
    const clinicId = clinic.id;
    return (
      <span
        className={props.currentClinic === clinic.id ? classes.active : null}
        key={clinic.id + i}
        onClick={() => props.setClinic(clinicId)}
      >
        {clinic.id}
      </span>
    );
  });
  return (
    <div className={classes.SideSlider}>
      <section>{clinicLinks}</section>
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
