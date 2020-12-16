import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import { checkValidity } from '../../../shared/checkValidity';
import Button from '../../UI/Button/Button';

import axios from 'axios';

class NewFeature extends Component {
  state = {
    controls: {
      suggestion: {
        0: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            name: '0',
            // label: 'Date',
            question: 'Please describe the issue',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
      },
    },
    formIsValid: false,
  };
  inputChangedHandler = (event, category, controlName) => {
    let updatedControls = {
      ...this.state.controls,
      [category]: {
        ...this.state.controls[category],
        [controlName]: {
          ...this.state.controls[category][controlName],
          value: event.target.value,
          valid: checkValidity(
            event.target.value,
            this.state.controls[category].validation
          ),
        },
      },
    };

    this.setState({ controls: updatedControls });
    this.validateForm(updatedControls);
  };
  validateForm = (controls) => {
    for (let section in controls) {
      for (let question in controls[section]) {
        const isValid = controls[section][question].valid;
        if (!isValid) {
          this.setState({ formIsValid: false });
          return false;
        }
      }
    }
    this.setState({ formIsValid: true });
  };
  formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://therapigeonbugreporterms-env.eba-cpajmpju.us-east-1.elasticbeanstalk.com/soup/?bug=' +
          this.state.controls.suggestion['0'].value
      )
      .then((response) => {
        this.props.history.goBack();
      })
      .catch((err) => {
        this.props.history.goBack();
        console.log(err);
      });
  };
  render() {
    return (
      <form onSubmit={(e) => this.formSubmitHandler(e)}>
        <Input
          elementType={this.state.controls.suggestion['0'].elementType}
          elementConfig={this.state.controls.suggestion['0'].elementConfig}
          value={this.state.controls.suggestion['0'].value}
          changed={(e) => this.inputChangedHandler(e, 'suggestion', '0')}
          shouldValidate={this.state.controls.suggestion['0'].validation}
          invalid={!this.state.controls.suggestion['0'].valid}
          touched={this.state.controls.suggestion['0'].touched}
          label={this.state.controls.suggestion['0'].label}
          registring={this.state.isSignup}
        />
        <Button type="submit" disabled={!this.state.formIsValid}>
          Submit
        </Button>
      </form>
    );
  }
}

export default NewFeature;
