import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';

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
  render() {
    return (
      <div className={classes.ViewHistory}>
        <h2>Check your history</h2>
        <form>
          <Input
            elementType={this.state.controls.search.elementType}
            elementConfig={this.state.controls.search.elementConfig}
            value={this.state.controls.search.value}
            // changed={(e) => this.inputChangedHandler(e, this.state.controls.search.id)}
            shouldValidate={this.state.controls.search.validation}
            invalid={!this.state.controls.search.valid}
          />
        </form>
      </div>
    );
  }
}

export default Viewhistory;
