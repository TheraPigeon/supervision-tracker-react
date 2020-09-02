import React, { Component } from 'react';
import classes from './NewClinic.module.css';

class NewClinic extends Component {
  state = {
    showForm: false,
  };
  render() {
    return (
      <div className={classes.NewClinic}>
        <div>
          <span>Join a clinic</span>
          <p>Know your clinic's Id? Use it here!</p>
        </div>
        <div>
          <span>Create a clinic</span>
          <p>Make a clinic, manage all staff members!</p>
        </div>
      </div>
    );
  }
}

export default NewClinic;
