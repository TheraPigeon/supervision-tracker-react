import * as actionTypes from './actionTypes';
import axios from '../../axios-soup';
import * as actions from './index';

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
    dispatch(joinClinicStart());
    let url = 'api/clinics';
    if (isJoin) {
      url = 'api/clinics/' + clinicData + '/join';
      axios
        .post(url, null, {
          headers: {
            Authorization: 'Token ' + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(joinClinicSuccess());
            dispatch(actions.addClinic({ ...res.data }));
            dispatch(actions.setCurrentClinic(res.data.id));
          }

          console.log(res);
        })
        .catch((err) => {
          dispatch(joinClinicFail(err));
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
          dispatch(actions.addClinic({ ...res.data }));
          dispatch(actions.setCurrentClinic(res.data.id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
