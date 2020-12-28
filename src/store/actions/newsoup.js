import axios from '../../axios-soup';
import * as actionTypes from './actionTypes';

export const addSoup = ({ soupData, token, edit, soupId }) => {
  return (dispatch) => {
    dispatch(addSoupStart());
    const url = edit ? `api/supervisions/${soupId}` : 'api/supervisions';
    const method = edit ? 'put' : 'post';
    const headers = {
      Authorization: 'Token ' + token,
    };
    axios({ method, url, data: soupData, headers })
      .then((res) => {
        console.log(res);
        dispatch(addSoupSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(addSoupFail(err));
      });
  };
};

export const addSoupStart = () => {
  return {
    type: actionTypes.ADD_SOUP_START,
    loading: true,
  };
};
export const addSoupSuccess = () => {
  return {
    type: actionTypes.ADD_SOUP_SUCCESS,
    loading: false,
  };
};

export const addSoupFail = (error) => {
  return {
    type: actionTypes.ADD_SOUP_FAIL,
    loading: false,
    error: error,
  };
};
