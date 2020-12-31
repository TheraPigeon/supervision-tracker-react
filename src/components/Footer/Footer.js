import React, { useState } from 'react';

import PrivacyPolicy from './Legal/privacyPolicy';
import Tos from './Legal/tos';
import Modal from '../UI/Modal/Modal';
import classes from './Footer.module.css';

const Footer = (props) => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  return (
    <div className={classes.Footer}>
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
      <a onClick={() => setShowPrivacy(!showPrivacy)}>Privacy Policy</a>
      <a onClick={() => setShowTerms(!showPrivacy)}>Terms of Service</a>
      <div class="footerContent">
        &copy; 2020 - 2021 Made with love by{' '}
        <a href="http://www.therapigeon.com" target="_blank">
          TheraPigeon
        </a>
      </div>
    </div>
  );
};

export default Footer;
