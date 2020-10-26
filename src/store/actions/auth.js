import axios from '../../axios-soup';
import * as actionTypes from './actionTypes';

export const addClinic = (newClinic) => {
  return {
    type: actionTypes.ADD_CLINIC,
    clinic: newClinic,
  };
};
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, name, roster, clinics, isIntern) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
    roster,
    clinics,
    isIntern,
    name,
  };
};
export const setCurrentClinic = (clinicId) => {
  if (typeof clinicId === 'number') {
    localStorage.setItem('currentClinic', clinicId);
  }

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

export const auth = (email, password, isSignup, isIntern, name) => {
  return (dispatch) => {
    dispatch(authStart());
    let url = 'api/users/login/';
    let authData = {
      user: {
        email: email,
        password: password,
      },
    };
    if (isSignup) {
      url = 'api/users/';
      authData = {
        user: {
          name: name,
          email: email,
          password: password,
          intern: isIntern,
        },
      };
    }
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.id);
        dispatch(
          authSuccess(
            res.data.token,
            res.data.id,
            res.data.name,
            res.data.roster_members,
            res.data.clinics,
            res.data.intern
          )
        );
        const currentClinic = localStorage.getItem('currentClinic');
        const inClinic = res.data.clinics.filter((a) => {
          return a.id === parseInt(currentClinic);
        });
        if (currentClinic && res.data.clinics.length !== 0 && inClinic.length) {
          dispatch(setCurrentClinic(parseInt(currentClinic)));
        } else if (res.data.clinics.length !== 0) {
          dispatch(setCurrentClinic(res.data.clinics[0].id));
        }
        const expiresIn = 36000;
        dispatch(checkAuthTimeout(expiresIn));
        //dispatch(checkAuthTimeout(res.data.expiresIn)); NEED expiresIn from Server Response
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');
      const url = 'api/user_data?user_id=' + userId;
      const headers = {};
      axios.post(url, null, headers).then((res) => {
        console.log(res);
        dispatch(
          authSuccess(
            token,
            userId,
            res.data.name,
            res.data.roster_members,
            res.data.clinics,
            res.data.intern
          )
        );
        const currentClinic = localStorage.getItem('currentClinic');
        const inClinic = res.data.clinics.filter((a) => {
          return a.id === parseInt(currentClinic);
        });
        if (currentClinic && res.data.clinics.length !== 0 && inClinic.length) {
          dispatch(setCurrentClinic(parseInt(currentClinic)));
        } else if (res.data.clinics.length !== 0) {
          dispatch(setCurrentClinic(res.data.clinics[0].id));
        }
      });
    }
  };
};
