import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './NewClinic.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
class NewClinic extends Component {
  state = {
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
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
    isJoin: false,
    showForm: false,
  };
  showCreateFormHandler = () => {
    const updatedControls = {
      ...this.state.controls,
      name: {
        ...this.state.controls.name,
        label: "Your clinic's name",
      },
    };
    this.setState((prevState) => {
      return {
        controls: updatedControls,
        isJoin: false,
        showForm: !prevState.showForm,
      };
    });
  };
  showJoinFormHandler = () => {
    const updatedControls = {
      ...this.state.controls,
      name: {
        ...this.state.controls.name,
        label: 'Join Clinic (by ID)',
      },
    };
    this.setState((prevState) => {
      return {
        controls: updatedControls,
        isJoin: true,
        showForm: !prevState.showForm,
      };
    });
  };
  inputChangedHandler = (event) => {
    const updatedControls = {
      ...this.state.controls,
      name: {
        ...this.state.controls.name,
        value: event.target.value,
      },
    };
    this.setState({ controls: updatedControls });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onJoin(
      this.state.isJoin,
      this.state.controls.name.value,
      this.props.token
    );
  };
  render() {
    let form = null;
    if (this.state.showForm) {
      form = (
        <form
          onSubmit={(e) => this.handleFormSubmit(e)}
          className={classes.Form}
        >
          <Input
            elementType={this.state.controls.name.elementType}
            elementConfig={this.state.controls.name.elementConfig}
            value={this.state.controls.name.value}
            changed={(e) => this.inputChangedHandler(e)}
            shouldValidate={this.state.controls.name.validation}
            invalid={this.state.controls.name.valid}
            touched={this.state.controls.name.touched}
            label={this.state.controls.name.label}
          />
          <Button>Submit</Button>
        </form>
      );
    }

    return (
      <div className={classes.NewClinic}>
        {form}
        {!this.state.showForm ? (
          <React.Fragment>
            <div className={classes.Button} onClick={this.showJoinFormHandler}>
              <span>Join a clinic</span>
              <p>Know your clinic's Id? Use it here!</p>
            </div>
            <div
              className={classes.Button}
              onClick={this.showCreateFormHandler}
            >
              <span>Create a clinic</span>
              <p>Make a clinic, manage all staff members!</p>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
const mapPropsToState = (state) => {
  return {
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onJoin: (isJoin, data, token) =>
      dispatch(actions.joinClinic(isJoin, data, token)),
  };
};
export default connect(mapPropsToState, mapDispatchToProps)(NewClinic);
