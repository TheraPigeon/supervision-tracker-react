import React from 'react';
import { connect } from 'react-redux';

import classes from './Member.module.css';
import { NavLink } from 'react-router-dom';

const member = (props) => {
  return (
    <section className={classes.Member}>
      <main>
        <span className={classes.Id}>{props.memberId}</span>

        <h3>{props.name}</h3>
      </main>
      <section>
        <NavLink
          to={{ pathname: '/soupervision/' + props.memberId, name: props.name }}
        >
          View History
        </NavLink>
        <NavLink
          to={{ pathname: '/soupervision/' + props.memberId, name: props.name }}
        >
          Add Soup
        </NavLink>
      </section>

      <aside>
        <span>10%</span>
        <span>50%</span>
        <span>34%</span>
      </aside>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    roster: state.auth.roster,
  };
};
export default connect(mapStateToProps)(member);
