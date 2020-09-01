import React from 'react';
import { connect } from 'react-redux';
import classes from './SideSlider.module.css';
import * as actions from '../../../../store/actions/index';
const sideslider = (props) => {
  const clinicLinks = props.clinics.map((clinic) => {
    const clinicId = clinic.id;
    return (
      <span key={clinic.id} onClick={() => props.setClinic(clinicId)}>
        {clinic.id}
      </span>
    );
  });
  return (
    <div className={classes.SideSlider}>
      {clinicLinks}
      <span onClick={() => props.setClinic(5)}>5</span>
      <span>+</span>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    clinics: state.auth.clinics,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setClinic: (clinicId) => dispatch(actions.setCurrentClinic(clinicId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(sideslider);
