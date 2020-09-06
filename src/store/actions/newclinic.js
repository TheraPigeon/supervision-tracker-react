import * as actionTypes from './actionTypes';
import axios from '../../axios-soup';

export const joinClinicStart = () => {
  return {
    type: actionTypes.JOIN_CLINIC_START,
  };
};
export const joinClinicSuccess = () => {
  return {
    type: actionTypes.JOIN_CLINIC_SUCCESS,
  };
};
export const joinClinicFail = (error) => {
  return {
    type: actionTypes.JOIN_CLINIC_FAIL,
    error: error,
  };
};

export const joinClinic = (isJoin, clinicData, token) => {
  return (dispatch) => {
    dispatch(joinClinicStart);
    let url = 'api/clinics';
    if (isJoin) {
      url = 'api/clinic/' + clinicData + '/join';
      axios
        .get(url, {
          headers: {
            Authorization: 'Token ' + token,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const newClinicData = {
        clinic: {
          name: clinicData,
        },
      };
      axios
        .post(url, newClinicData, {
          headers: {
            Authorization: 'Token ' + token,
          },
        })
        .then((res) => {
          console.log(res);
          dispatch(joinClinicSuccess);
        });
    }
  };
};
