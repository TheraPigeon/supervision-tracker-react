import axios from '../../axios-soup';
import * as actionTypes from './actionTypes';

export const createStaffStart = () => {
  return {
    type: actionTypes.CREATE_STAFF_START,
  };
};
export const createStaffSuccess = () => {
  return {
    type: actionTypes.CREATE_STAFF_SUCCESS,
  };
};
export const createStaffFail = (error) => {
  return {
    type: actionTypes.CREATE_STAFF_FAIL,
    error: error,
  };
};

export const createStaff = (name, isFollow, clinicId, token) => {
  console.log(clinicId);
  return (dispatch) => {
    dispatch(createStaffStart());
    let authData = {
      staff: { name: name, clinic_id: clinicId },
      roster_add: true,
    };
    axios
      .post('api/staff_members', authData, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(createStaffSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(createStaffFail(err));
      });
    if (isFollow) {
      //add to roster action
    }
  };
};

export const addStaffStart = () => {
  return {
    type: actionTypes.ADD_STAFF_START,
  };
};
export const addStaffSuccess = () => {
  return {
    type: actionTypes.ADD_STAFF_SUCCESS,
  };
};
export const addStaffFail = (error) => {
  return {
    type: actionTypes.ADD_STAFF_FAIL,
    error: error,
  };
};

export const addStaff = (staffId, token) => {
  return (dispatch) => {
    dispatch(addStaffStart());
    let authData = {
      roster: { staff_ids: [staffId] },
    };
    axios
      .post('api/staff_members', authData, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(createStaffSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(createStaffFail(err));
      });
  };
};
