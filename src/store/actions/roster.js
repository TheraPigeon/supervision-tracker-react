import axios from '../../axios-soup';
import * as actionTypes from './actionTypes';

export const createStaffStart = () => {
  return {
    type: actionTypes.CREATE_STAFF_START,
  };
};
export const createStaffSuccess = ({ newStaff, isFollow }) => {
  return {
    type: actionTypes.CREATE_STAFF_SUCCESS,
    newStaff,
    isFollow,
  };
};
export const createStaffFail = (error) => {
  return {
    type: actionTypes.CREATE_STAFF_FAIL,
    error: error,
  };
};

export const createStaff = (name, isFollow, clinicId, hours, token) => {
  return (dispatch) => {
    dispatch(createStaffStart());
    let authData = {
      staff: { name: name, clinic_id: clinicId, hours: hours },
      roster_add: isFollow,
    };
    axios
      .post('api/staff_members', authData, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        const id = res.data.staff_member.id;
        const data = {
          id: id,
          clinic_id: res.data.staff_member.clinic.id,
          name: res.data.staff_member.name,
          hours: res.data.staff_member.hours,
          supervisions: [{}],
        };
        dispatch(createStaffSuccess({ newStaff: data, isFollow }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createStaffFail(err));
      });
  };
};

export const addStaffStart = () => {
  return {
    type: actionTypes.ADD_STAFF_START,
  };
};
export const addStaffSuccess = (staffData) => {
  return {
    type: actionTypes.ADD_STAFF_SUCCESS,
    staffData: staffData,
  };
};
export const addStaffFail = (error) => {
  return {
    type: actionTypes.ADD_STAFF_FAIL,
    error: error,
  };
};

export const kickStaffStart = () => {
  return {
    type: actionTypes.KICK_STAFF_START,
  };
};
export const kickStaffSuccess = (staffId) => {
  return {
    type: actionTypes.KICK_STAFF_SUCCESS,
    staffId: staffId,
  };
};
export const kickStaffFail = (error) => {
  return {
    type: actionTypes.KICK_STAFF_FAIL,
    error: error,
  };
};

export const addStaff = (staffId, token, isFollowing) => {
  return (dispatch) => {
    let authData = {
      roster: { staff_ids: [staffId] },
    };
    let url = 'api/rosters/add_staff';
    if (isFollowing) {
      url = 'api/rosters/kick_staff';
      dispatch(kickStaffStart());
    } else {
      dispatch(addStaffStart());
    }
    axios
      .post(url, authData, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        console.log(res);
        if (isFollowing) {
          dispatch(kickStaffSuccess(staffId));
        } else {
          dispatch(addStaffSuccess(res.data.added_members));
        }
      })
      .catch((err) => {
        console.log(err);
        if (isFollowing) {
          dispatch(kickStaffFail);
        } else {
          dispatch(addStaffFail(err));
        }
      });
  };
};
