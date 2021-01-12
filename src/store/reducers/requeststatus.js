import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  active: false,
  success: null,
  failure: null,
};
const requestStatusSuccess = (state, action) => {
  return updateObject(state, {
    success: action.successMessage,
  });
};
const requestStatusFailure = (state, action) => {
  return updateObject(state, {
    failure: action.failureMessage,
  });
};
const requestStatusClear = (state, action) => {
  return updateObject(state, {
    success: null,
    failure: null,
    active: false,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_STATUS_SUCCESS:
      return requestStatusSuccess(state, action);
    case actionTypes.REQUEST_STATUS_FAILURE:
      return requestStatusFailure(state, action);
    case actionTypes.REQUEST_STATUS_CLEAR:
      return requestStatusClear(state, action);
    default:
      return state;
  }
};

export default reducer;
