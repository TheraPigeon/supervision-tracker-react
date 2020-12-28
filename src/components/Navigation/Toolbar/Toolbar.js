import React from 'react';
import { connect } from 'react-redux';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Toolbar.module.css';
import elasticMenu from '../../../assets/css/elastic_ham_menu.module.css';
const toolbar = (props) => {
  const buttonStyle = [elasticMenu.hamburger, elasticMenu.hamburgerElastic];
  if (props.isExpanded) {
    buttonStyle.push(elasticMenu.isActive);
  }
  return (
    <React.Fragment>
      <Backdrop
        show={props.isExpanded}
        clicked={props.expandMenu}
        style={{ zIndex: '100' }}
      />
      <header className={classes.Toolbar}>
        {/* <div style={{ zIndex: '100000' }} >
      <img src={menuSVG} alt="hamburger menu" />
    </div> */}
        {props.isAuthorized ? (
          <button
            className={buttonStyle.join(' ')}
            type="button"
            onClick={props.expandMenu}
          >
            <span className={elasticMenu.hamburgerBox}>
              <span className={elasticMenu.hamburgerInner}></span>
            </span>
          </button>
        ) : null}
        <Logo authed={props.isAuthorized} />
        {props.isAuth ? <span>Welcome, {props.name}!</span> : null}
      </header>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.auth.token !== null,
    name: state.auth.name,
  };
};

export default connect(mapStateToProps)(toolbar);
