import axios from '../../axios-soup';
import * as actionTypes from './actionTypes';

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
export const deleteSoupSuccess = (soupId) => {
  return {
    type: actionTypes.DELETE_SOUP_SUCCESS,
    soupId: soupId,
  };
};
export const deleteSoupFail = (error) => {
  return {
    type: actionTypes.DELETE_SOUP_FAIL,
    error: error,
  };
};

export const deleteSoup = (soupId) => {
  return (dispatch) => {
    dispatch(deleteSoupStart());

    dispatch(deleteSoupSuccess(soupId));

    let url = 'api/supervisions/';
    axios
      .delete(url + soupId)
      .then((res) => {
        console.log(res);
        dispatch(deleteSoupSuccess(soupId));
      })
      .catch((err) => {
        console.log(err);
        dispatch(deleteSoupFail(err));
      });
  };
};
