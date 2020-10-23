import React, { Component } from 'react';
import classes from './Reset.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

import { checkValidity } from '../../../shared/checkValidity';
import axios from '../../../axios-soup';
class Reset extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          'data-attr': 'email-reset',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        label: 'Email',
      },
    },
  };
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    if (controlName === 'intern') {
      updatedControls[controlName].checked = event.target.checked;
    }
    this.setState({ controls: updatedControls });
  };
  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('api/password/forgot', null, {
        params: {
          email: this.state.controls.email.value,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    console.log(this.state.controls.email.valid);
    return (
      <div className={classes.Reset}>
        <h1>Get help signing in</h1>
        <h2>For your security, we need to make sure it's really you.</h2>
        <span>Would you please provide your email?</span>
        <form onSubmit={(e) => this.submitHandler(e)}>
          <Input
            elementType={this.state.controls.email.elementType}
            elementConfig={this.state.controls.email.elementConfig}
            value={this.state.controls.email.value}
            changed={(e) => this.inputChangedHandler(e, 'email')}
            shouldValidate={this.state.controls.email.validation}
            invalid={!this.state.controls.email.valid}
            touched={this.state.controls.email.touched}
            label={this.state.controls.email.label}
            registring
          />
          <Button
            btnType="Transparent"
            disabled={!this.state.controls.email.valid}
          >
            Receive email
          </Button>
        </form>
      </div>
    );
  }
}

export default Reset;
