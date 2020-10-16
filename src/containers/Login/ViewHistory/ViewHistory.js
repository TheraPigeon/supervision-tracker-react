import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { withRouter } from 'react-router-dom';
import classes from './ViewHistory.module.css';

class Viewhistory extends Component {
  state = {
    controls: {
      search: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Id (i.e. 123)',
        },
        value: '',
        validation: {},
        valid: true,
      },
    },
  };
  inputChangedHandler = (event) => {
    const updatedControls = {
      ...this.state.controls,
      search: {
        ...this.state.controls.search,
        value: event.target.value,
      },
    };
    this.setState({ controls: updatedControls });
  };
  handleViewHistory = (e) => {
    e.preventDefault();
    this.props.history.push('/history/' + this.state.controls.search.value);
  };
  render() {
    return (
      <div className={classes.ViewHistory}>
        <h2>Check your history</h2>
        <form onSubmit={(e) => this.handleViewHistory(e)}>
          <Input
            elementType={this.state.controls.search.elementType}
            elementConfig={this.state.controls.search.elementConfig}
            value={this.state.controls.search.value}
            changed={(e) => this.inputChangedHandler(e)}
            shouldValidate={this.state.controls.search.validation}
            invalid={!this.state.controls.search.valid}
          />
          <Button btnType="Search">Go!</Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Viewhistory);
