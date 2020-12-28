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

export const authSuccess = ({
  token,
  userId,
  name,
  email,
  emailIsVerified,
  hasCompletedProfile,
  isNewUser,
}) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
    name,
    email,
    emailIsVerified,
    hasCompletedProfile,
    isNewUser,
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

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START,
  };
};
export const fetchUserSuccess = ({
  roster,
  clinics,
  isIntern,
  profileCompleted,
}) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    roster,
    clinics,
    isIntern,
    profileCompleted,
  };
};
export const fetchUserFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error,
  };
};
export const fetchUser = (token) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    const url = `api/user_data`;
    axios
      .get(url, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(
          fetchUserSuccess({
            roster: res.data.roster_members,
            clinics: res.data.clinics,
            isIntern: res.data.intern,
          })
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
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUserFail(err));
      });
  };
};
export const auth = (token) => {
  return (dispatch) => {
    dispatch(authStart());
    let url = 'api/authenticate/';
    let authData = {
      id_token: token,
    };
    // if (isSignup) {
    //   url = 'api/users/';
    //   authData = {
    //     user: {
    //       name: name,
    //       email: email,
    //       password: password,
    //       intern: isIntern,
    //     },
    //   };
    // }
    axios
      .post(url, authData)
      .then(({ data }) => {
        console.log(data);
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('userId', data.id);

        // dispatch(
        //   authSuccess(
        //     data.token,
        //     data.id,
        //     data.name,
        //     data.roster_members,
        //     data.clinics,
        //     data.intern
        //   )
        // );

        // Auth0
        dispatch(
          authSuccess({
            token: data.token,
            userId: data.id,
            name: data.name,
            email: data.email,
            emailIsVerified: data.email_verified,
            hasCompletedProfile: data.has_completed_profile,
            isNewUser: data.is_new_user,
          })
        );

        dispatch(fetchUser(data.token, data.id));

        const expiresIn = 36000;
        dispatch(checkAuthTimeout(expiresIn));
        //dispatch(checkAuthTimeout(data.expiresIn)); NEED expiresIn from Server Response
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.message));
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
      axios.post(url, null, headers).then(({ data }) => {
        console.log(data);
        dispatch(
          authSuccess({
            token: data.token,
            userId,
            roster: data.roster_members,
            clinics: data.clinics,
            isIntern: data.intern,
          })
        );
        const currentClinic = localStorage.getItem('currentClinic');
        const inClinic = data.clinics.filter((a) => {
          return a.id === parseInt(currentClinic);
        });
        if (currentClinic && data.clinics.length !== 0 && inClinic.length) {
          dispatch(setCurrentClinic(parseInt(currentClinic)));
        } else if (data.clinics.length !== 0) {
          dispatch(setCurrentClinic(data.clinics[0].id));
        }
      });
    }
  };
};
