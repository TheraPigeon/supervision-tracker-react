import * as actionTypes from './actionTypes';
import axios from '../../axios-soup';

export const fetchMembersStart = () => {
  return {
    type: actionTypes.FETCH_MEMBERS_START,
  };
};

export const fetchMembersSuccess = (members) => {
  return {
    type: actionTypes.FETCH_MEMBERS_SUCCESS,
    members: members,
  };
};

export const fetchMembersFail = (error) => {
  return {
    type: actionTypes.FETCH_MEMBERS_FAIL,
    error: error,
  };
};

export const fetchMembers = (clinicId, token) => {
  return (dispatch) => {
    dispatch(fetchMembersStart());
    axios
      .get('api/clinics/' + clinicId, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(fetchMembersSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editStaffStart = () => {
  return {
    type: actionTypes.EDIT_STAFF_START,
  };
};
export const editStaffSuccess = (updatedStaff, staffId) => {
  return {
    type: actionTypes.EDIT_STAFF_SUCCESS,
    updatedStaff: updatedStaff,
    staffId: staffId,
  };
};
export const editStaffFail = (error) => {
  return {
    type: actionTypes.EDIT_STAFF_FAIL,
    error: error,
  };
};

export const editStaff = (userData, token) => {
  return (dispatch) => {
    dispatch(editStaffStart());
    const { name, hours, staffId } = userData;
    const updatedStaff = {
      staff: {
        name: name,
        hours: hours,
      },
    };
    axios
      .put('api/staff_members/' + staffId, updatedStaff, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        const staffData = {
          name: res.data.staff_member.name,
          hours: res.data.staff_member.hours,
        };
        dispatch(editStaffSuccess(staffData, staffId));
      })
      .catch((err) => {
        console.log(err);
        dispatch(editStaffFail(err));
      });
  };
};

export const deleteStaffStart = () => {
  return {
    type: actionTypes.DELETE_STAFF_START,
  };
};

export const deleteStaffSuccess = (staffId) => {
  return {
    type: actionTypes.DELETE_STAFF_SUCCESS,
    staffId: staffId,
  };
};

export const deleteStaffFail = (error) => {
  return {
    type: actionTypes.DELETE_STAFF_FAIL,
    error: error,
  };
};

export const deleteStaff = (staffId, token) => {
  return (dispatch) => {
    axios
      .delete('api/staff_members/' + staffId, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(deleteStaffSuccess(staffId));
      })
      .catch((err) => {
        console.log(err);
        dispatch(deleteStaffFail(err));
      });
  };
};
