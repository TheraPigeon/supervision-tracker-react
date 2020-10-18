import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

import { merge, cloneDeep } from 'lodash';

const initialState = {
  token: null,
  userId: null,
  error: null,
  name: null,
  loading: false,
  authRedirectPath: '/',
  roster: [],
  clinics: [],
  currentClinic: null,
  isIntern: null,
};

const setCurrectClinic = (state, action) => {
  return updateObject(state, { currentClinic: action.currentClinic });
};
const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
    roster: action.roster,
    clinics: action.clinics,
    isIntern: action.isIntern,
    name: action.name,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};
const addClinic = (state, action) => {
  const updatedClinics = [...state.clinics, action.clinic];
  return updateObject(state, { clinics: updatedClinics });
};

const addStaffStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const addStaffSuccess = (state, action) => {
  const updatedRoster = merge({}, state.roster, action.staffData);
  return updateObject(state, { loading: false, roster: updatedRoster });
};
const addStaffFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const kickStaffStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const kickStaffSuccess = (state, action) => {
  //action.staffID

  const updatedRoster = cloneDeep(state.roster);
  delete updatedRoster[action.staffId];
  return updateObject(state, { loading: false, roster: updatedRoster });
};
const kickStaffFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.SET_CURRENT_CLINIC:
      return setCurrectClinic(state, action);
    case actionTypes.ADD_CLINIC:
      return addClinic(state, action);
    case actionTypes.ADD_STAFF_START:
      return addStaffStart(state, action);
    case actionTypes.ADD_STAFF_SUCCESS:
      return addStaffSuccess(state, action);
    case actionTypes.ADD_STAFF_FAIL:
      return addStaffFail(state, action);
    case actionTypes.KICK_STAFF_START:
      return kickStaffStart(state, action);
    case actionTypes.KICK_STAFF_SUCCESS:
      return kickStaffSuccess(state, action);
    case actionTypes.KICK_STAFF_FAIL:
      return kickStaffFail(state, action);
    default:
      return state;
  }
};

export default reducer;
