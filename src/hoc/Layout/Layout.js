import React, { useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
const Layout = (props) => {
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
    console.log('expanding menu');
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
      {props.isAuthorized ? <SideDrawer showMenu={expandedMenu} /> : null}
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
