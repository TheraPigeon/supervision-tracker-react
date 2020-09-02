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
