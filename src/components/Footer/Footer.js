import React, { useState } from 'react';

import PrivacyPolicy from './Legal/privacyPolicy';
import Tos from './Legal/tos';
import Modal from '../UI/Modal/Modal';
import classes from './Footer.module.css';

const Footer = (props) => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  return (
    <React.Fragment>
      <div className={classes.Terms}>
        <Modal show={showTerms} modalClosed={() => setShowTerms(!showTerms)}>
          <Tos />
        </Modal>
        <Modal
          show={showPrivacy}
          modalClosed={() => setShowPrivacy(!showPrivacy)}
        >
          <PrivacyPolicy />
        </Modal>
      </div>
      <div className={classes.Footer}>
        <button onClick={() => setShowPrivacy(!showPrivacy)}>
          Privacy Policy
        </button>
        <button onClick={() => setShowTerms(!showPrivacy)}>
          Terms of Service
        </button>

        <p>Copyright &copy; 2021</p>
        {/* <br /> */}
        <p>
          Made with love by{' '}
          <a
            href="http://www.therapigeon.com"
            target="_blank"
            rel="external noreferrer nofollow noopener"
          >
            TheraPigeon
          </a>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Footer;
