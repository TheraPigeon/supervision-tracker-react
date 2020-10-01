import axios from '../../axios-soup';
import * as actionTypes from './actionTypes';

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

export const addStaffFail = () => {
  return {
    type: actionTypes.ADD_STAFF_FAIL,
  };
};

export const addStaff = (name, token) => {
  return (dispatch) => {
    dispatch(addStaffStart());
    let authData = {
      staff: { name: name },
    };
    axios
      .post('api/staff_members', authData, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(addStaffSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(addStaffFail(err));
      });
  };
};
