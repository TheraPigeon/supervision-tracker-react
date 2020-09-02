import axios from '../../axios-soup';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, roster, clinics) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
    roster,
    clinics,
  };
};
export const setCurrentClinic = (clinicId) => {
  return {
    type: actionTypes.SET_CURRENT_CLINIC,
    currentClinic: clinicId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      user: {
        email: email,
        password: password,
      },
    };
    let url = 'api/users/login/';

    if (isSignup) {
      url = 'api/users/';
    }
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        dispatch(
          authSuccess(
            res.data.token,
            res.data.id,
            res.data.roster_members,
            res.data.clinics
          )
        );
        dispatch(setCurrentClinic(res.data.clinics[0].id));
        const expiresIn = 36000;
        dispatch(checkAuthTimeout(expiresIn));

        //dispatch(checkAuthTimeout(res.data.expiresIn)); NEED expiresIn from Server Response
      })
      .catch((err) => {
        console.log(err);
        // dispatch(authFail(err.response.data.error));
      });
  };
};
