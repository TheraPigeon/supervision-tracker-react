import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

import { merge, cloneDeep, update } from 'lodash';

const initialState = {
  token: null,
  userId: null,
  error: null,
  name: null,
  loading: false,
  authRedirectPath: '/roster',
  roster: [],
  clinics: [],
  currentClinic: null,
  isIntern: false,
  hasCompletedProfile: null,
  email: null,
  emailIsVerified: null,
  isNewUser: null,
};

const updatedRoster = (state, action) => {
  const updatedRoster = [...state.roster];
  updatedRoster.push(action.staffId);
  return updateObject(state, { roster: updatedRoster });
};

const updateUserProfileStart = (state, action) => {
  return updateObject(state, { loading: action.loading });
};
const updateUserProfileSuccess = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    hasCompletedProfile: true,
    name: action.name,
    intern: action.intern,
  });
};
const updateUserProfileFail = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
    error: action.error,
  });
};

const setCurrectClinic = (state, action) => {
  return updateObject(state, { currentClinic: action.currentClinic });
};

const fetchUserStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const fetchUserSuccess = (state, action) => {
  return updateObject(state, {
    roster: action.roster,
    clinics: action.clinics,
    isIntern: action.isIntern,
    loading: false,
    error: null,
  });
};
const fetchUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    name: action.name,
    email: action.email,
    emailIsVerified: action.emailIsVerified,
    hasCompletedProfile: action.hasCompletedProfile,
    isNewUser: action.isNewUser,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  // localStorage.removeItem('token');
  // localStorage.removeItem('userId');
  // localStorage.removeItem('currentClinic');
  return updateObject(state, { token: 'null', userId: 'null' });
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
  const updatedRoster = [...state.roster];
  updatedRoster.push(action.staffData);
  return updateObject(state, { loading: false, roster: updatedRoster });
};
const addStaffFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const kickStaffStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const kickStaffSuccess = (state, action) => {
  const staffIndex = state.roster.findIndex(
    (staffId) => staffId === action.staffId
  );
  const updatedRoster = [...state.roster];
  updatedRoster.splice(staffIndex, 1);
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
    case actionTypes.UPDATE_USER_PROFILE_START:
      return updateUserProfileStart(state, action);
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return updateUserProfileSuccess(state, action);
    case actionTypes.UPDATE_USER_PROFILE_FAIL:
      return updateUserProfileFail(state, action);
    case actionTypes.FETCH_USER_START:
      return fetchUserStart(state, action);
    case actionTypes.FETCH_USER_SUCCESS:
      return fetchUserSuccess(state, action);
    case actionTypes.FETCH_USER_FAIL:
      return fetchUserFail(state, action);
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

    //update roster on Add Staff
    case actionTypes.UPDATE_ROSTER:
      return updatedRoster(state, action);
    default:
      return state;
  }
};

export default reducer;
