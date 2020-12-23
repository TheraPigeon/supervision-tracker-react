import React, { useEffect } from 'react';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = (props) => {
  const { logout } = useAuth0();
  useEffect(() => {
    props.onLogout();
    logout();
  }, [props, logout]);
  return <div>Loging out</div>;
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
