import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import classes from './RequestStatus.module.css';
import * as actions from '../../store/actions/index';

const RequestStatus = (props) => {
  const [message, setMessage] = useState(null);
  const [style, setStyle] = useState('Success');
  const { successMessage, failureMessage } = props;
  const clearMessage = () => {
    setMessage(null);
    props.clearRequestMessage();
  };
  useEffect(() => {
    successMessage ? setStyle('Success') : setStyle('Failure');
    const res = successMessage
      ? setMessage(`Your request has been successfully submitted!`)
      : failureMessage
      ? setMessage(`Something went wrong. Try again!`)
      : null;
    if (successMessage || failureMessage) {
      setTimeout(() => {
        clearMessage();
      }, 5000);
    }
  }, [successMessage, failureMessage]);
  return (
    <React.Fragment>
      {message ? (
        <div className={[classes.RequestStatus, classes[style]].join(' ')}>
          <section>{message}</section>
          <button onClick={clearMessage}>x</button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    successMessage: state.requeststatus.success,
    failureMessage: state.requeststatus.failure,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearRequestMessage: () => dispatch(actions.requestStatusClear()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestStatus);
