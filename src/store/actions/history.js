import axios from '../../axios-soup';
import * as actionTypes from './actionTypes';
import { requestStatusSuccess, requestStatusFailure } from './requeststatus';

export const clearSupervisions = () => {
  return {
    type: actionTypes.CLEAR_SUPERVISIONS,
  };
};
export const fetchSupervisionsStart = () => {
  return {
    type: actionTypes.FETCH_SUPERVISIONS_START,
  };
};
export const fetchSupervisionsSuccess = (supervisions) => {
  return {
    type: actionTypes.FETCH_SUPERVISIONS_SUCCESS,
    supervisions: supervisions,
  };
};
export const fetchSupervisionsFail = (error) => {
  return {
    type: actionTypes.FETCH_SUPERVISIONS_FAIL,
    error: error,
  };
};

export const fetchSupervisions = (staffId, token) => {
  return (dispatch) => {
    dispatch(fetchSupervisionsStart());
    let url = 'api/supervisions/';
    const params = {
      staff_id: staffId,
    };
    axios
      .get(url, { params })
      .then((res) => {
        console.log(res);
        dispatch(fetchSupervisionsSuccess(res.data.soups));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchSupervisionsFail(err));
      });
  };
};

export const fetchSoupStart = () => {
  return {
    type: actionTypes.FETCH_SOUP_START,
  };
};
export const fetchSoupSuccess = (soup) => {
  return {
    type: actionTypes.FETCH_SOUP_SUCCESS,
    soup: soup,
  };
};
export const fetchSoupFail = (error) => {
  return {
    type: actionTypes.FETCH_SOUP_FAIL,
    error: error,
  };
};

export const fetchSoup = (soupId) => {
  return (dispatch) => {
    dispatch(fetchSoupStart());
    let url = 'api/supervisions/';
    axios
      .get(url + soupId)
      .then((res) => {
        console.log(res);
        dispatch(fetchSoupSuccess(res.data.soup));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchSoupFail(err));
      });
  };
};

export const deleteSoupStart = () => {
  return {
    type: actionTypes.DELETE_SOUP_START,
  };
};
export const deleteSoupSuccess = (soupId, memberId, inProgress) => {
  return {
    type: actionTypes.DELETE_SOUP_SUCCESS,
    soupId: soupId,
    memberId: memberId,
    inProgress: inProgress,
  };
};
export const deleteSoupFail = (error) => {
  return {
    type: actionTypes.DELETE_SOUP_FAIL,
    error: error,
  };
};

// Action to delete InProgress soup REVIEW
export const deleteInProgressSoupStart = () => {
  return {
    type: actionTypes.DELETE_IN_PROGRESS_SOUP_START,
  };
};
export const deleteInProgressSoupSuccess = (soupId) => {
  return {
    type: actionTypes.DELETE_IN_PROGRESS_SOUP_SUCCESS,
    soupId: soupId,
  };
};
export const deleteInProgressSoupFail = (error) => {
  return {
    type: actionTypes.DELETE_IN_PROGRESS_SOUP_FAIL,
    error: error,
  };
};

export const deleteSoup = (data) => {
  const { soupId, token, inProgress, memberId } = data;
  return (dispatch) => {
    dispatch(deleteSoupStart());
    let url = 'api/supervisions/';
    axios
      .delete(url + soupId, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(requestStatusSuccess('Success'));
        dispatch(deleteSoupSuccess(soupId, memberId, inProgress));
      })
      .catch((err) => {
        console.log(err);
        dispatch(requestStatusFailure('Failed'));
        dispatch(deleteSoupFail(err));
      });
  };
};
