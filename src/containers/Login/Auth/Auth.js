import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/checkValidity';

class Auth extends Component {
  state = {
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          'data-attr': 'name-login',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        label: 'Name',
      },
      initial: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          'data-attr': 'initial-login',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        label: 'Initial',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          'data-attr': 'email-login',
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
      intern: {
        elementType: 'input',
        elementConfig: {
          type: 'checkbox',
          'data-attr': 'intern-login',
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        label: "I'm an intern",
      },
    },
    isSignup: false,
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
    const fullname = [
      this.state.controls.name.value,
      this.state.controls.initial.value,
    ].join(' ');
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup,
      this.state.controls.intern.checked,
      fullname
    );
  };
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      if (!this.state.isSignup && (key === 'name' || key === 'initial')) {
      } else {
        formElementArray.push({
          id: key,
          config: this.state.controls[key],
        });
      }
    }

    let form = formElementArray.map((formElement) => {
      if (
        !this.state.isSignup &&
        formElement.config.elementConfig['data-attr'] === 'intern-login'
      ) {
        return false;
      }
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
          registring={this.state.isSignup}
        />
      );
    });
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/roster" />;
    }
    let switchAuthModeMessage = (
      <p>
        Not a member?
        <span
          onClick={this.switchAuthModeHandler}
          className={classes.SignupBtn}
        >
          Join Soup
        </span>
      </p>
    );
    if (this.state.isSignup) {
      switchAuthModeMessage = (
        <p>
          Already a member?
          <span
            onClick={this.switchAuthModeHandler}
            className={classes.SignupBtn}
          >
            Log in
          </span>
        </p>
      );
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {/* {errorMessage} */}
        <form onSubmit={this.submitHandler}>
          <h2>{this.state.isSignup ? 'Join Soup' : 'Login to Soup'}</h2>
          {form}
          {!this.state.isSignup ? (
            <NavLink to="/reset_password">Forgot password?</NavLink>
          ) : null}
          <Button btnType="Login">
            {!this.props.loading ? (
              this.state.isSignup ? (
                'Signup'
              ) : (
                'Login'
              )
            ) : (
              <Spinner />
            )}
          </Button>
          {switchAuthModeMessage}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup, isIntern, name) =>
      dispatch(actions.auth(email, password, isSignup, isIntern, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
