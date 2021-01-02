import React, { useEffect } from 'react';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = (props) => {
  const { logout } = useAuth0();
  const returnTo = process.env.REACT_APP_AUTH0_RETURN_TO;
  useEffect(() => {
    props.onLogout();
    logout({ returnTo });
  }, [props, logout, returnTo]);
  return <div></div>;
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
