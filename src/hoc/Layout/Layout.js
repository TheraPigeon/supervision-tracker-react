import React from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = (props) => {
  return (
    <React.Fragment>
      {/* Toolbar, Sidebar, Backdrop */}
      <Toolbar />
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default layout;
