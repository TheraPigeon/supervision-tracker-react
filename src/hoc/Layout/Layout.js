import React, { useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
import { useAuth0 } from '@auth0/auth0-react';
const Layout = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);
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
      {/* Toolbar, Sidebar, Backdrop */}
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
export default connect(mapStateToProps)(Layout);
