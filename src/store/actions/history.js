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
    let url = 'api/supervisions/' + staffId;
    console.log(token);
    axios
      .get(url, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(fetchSupervisionsSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchSupervisionsFail(err));
      });
  };
};
