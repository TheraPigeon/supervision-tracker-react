import React from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
  return (
    <React.Fragment>
      {/* Toolbar, Sidebar, Backdrop */}
      <Toolbar />
      <SideDrawer />

      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default layout;
