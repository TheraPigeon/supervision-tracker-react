import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
  roster: [],
  clinics: [],
  currentClinic: null,
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
    default:
      return state;
  }
};

export default reducer;
