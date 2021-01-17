import * as actionTypes from './actionTypes';

export const requestStatusSuccess = (message) => {
  return {
    type: actionTypes.REQUEST_STATUS_SUCCESS,
    successMessage: message,
  };
};
export const requestStatusFailure = (message) => {
  return {
    type: actionTypes.REQUEST_STATUS_FAILURE,
    failureMessage: message,
  };
};

export const requestStatusClear = () => {
  return {
    type: actionTypes.REQUEST_STATUS_CLEAR,
  };
};
