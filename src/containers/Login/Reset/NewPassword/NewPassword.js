import React, { Component } from 'react';
import axios from '../../../../axios-soup';
import { checkValidity } from '../../../../shared/checkValidity';

import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';

import classes from './NewPassword.module.scss';
class NewPassword extends Component {
  state = {
    controls: {
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          'data-attr': 'password-login',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        label: 'Password',
      },
      verify: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          'data-attr': 'verify-login',
        },
        value: '',
        validation: {
          isMatch: true,
        },
        valid: false,
        touched: false,
        label: 'Confirm password',
      },
    },
  };
  inputChangedHandler = (event, controlName) => {
    let verifyMethod = null;
    if (controlName === 'verify') {
      verifyMethod = () => {
        return checkValidity(
          [this.state.controls.password.value, event.target.value],
          this.state.controls[controlName].validation
        );
      };
    } else {
      verifyMethod = () => {
        return checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        );
      };
    }
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: verifyMethod(),
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
    console.log(this.props.location.search.split('=')[1]);
    console.log(this.props);
    for (let key in this.state.controls) {
      if (!this.state.controls[key].valid) {
        return false;
      }
    }

    const data = {
      password: this.state.controls.password.value,
      token: this.props.location.search.split('=')[1],
    };
    axios
      .post('api/password/reset', data)
      .then((res) => {
        console.log(res);
        this.props.history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    let formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(e) => this.inputChangedHandler(e, formElement.id)}
          shouldValidate={formElement.config.validation}
          invalid={!formElement.config.valid}
          touched={formElement.config.touched}
          label={formElement.config.label}
          registring
        />
      );
    });

    return (
      <div className={classes.NewPassword}>
        <h2>Create New Password</h2>
        <form onSubmit={(e) => this.submitHandler(e)}>
          {form}
          <Button type="submit">Reset</Button>
        </form>
      </div>
    );
  }
}

export default NewPassword;
