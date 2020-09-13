import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
};

const joinClinicStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const joinClinicSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};
const joinClinicFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOIN_CLINIC_START:
      return joinClinicStart(state, action);
    case actionTypes.JOIN_CLINIC_SUCCESS:
      return joinClinicSuccess(state, action);
    case actionTypes.JOIN_CLINIC_FAIL:
      return joinClinicFail(state, action);
    default:
      return state;
  }
};

export default reducer;
