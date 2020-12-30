import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import * as actions from '../../store/actions/index';

const Layout = (props) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const { onAuth } = props;
  useEffect(() => {
    const req = async () => {
      await getIdTokenClaims().then((token) => {
        if (token && isAuthenticated) {
          onAuth(token.__raw);
        }
      });
    };
    req();
  }, [isAuthenticated, getIdTokenClaims, onAuth]);
  const style = {
    gridColumn: '1 / -1',
  };
  const styleAuthed = {
    color: '#fff',
    padding: '30px',
    overflowY: 'scroll',
  };
  const [expandedMenu, setExpandMenu] = useState(false);
  const handleSideDrawerToggle = () => {
    setExpandMenu(!expandedMenu);
  };
  return (
    <div className={classes.Layout}>
      <Toolbar
        isAuth={props.isAuthorized}
        expandMenu={handleSideDrawerToggle}
        isExpanded={expandedMenu}
      />
      {props.isAuthorized ? (
        <SideDrawer
          showMenu={expandedMenu}
          closeBackdrop={() => setExpandMenu(false)}
        />
      ) : null}
      <main
        style={!props.isAuthorized ? style : styleAuthed}
        className={classes.Content}
      >
        {props.children}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (token) => dispatch(actions.auth(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
