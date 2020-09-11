import React, { Component } from 'react';
import FormSection from '../../components/FormSection/FormSection';
import classes from './NewSoup.module.css';
import { cloneDeep } from 'lodash';
class NewSoup extends Component {
  mainSelection = [
    ['Always', 'A'],
    ['Sometimes', 'S'],
    ['Never', 'N'],
    ['N/A', 'NA'],
  ];
  state = {
    controls: {
      q1: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'q1',
          options: cloneDeep(this.mainSelection),
          question: 'Arrives on time / follows late arrive protocol',
        },
        value: '',
        validation: {},
      },
      q2: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
          name: 'q2',
          options: cloneDeep(this.mainSelection),
          question: 'Sets up materials/curriculum/data sheets for session',
        },
        value: '',
        validation: {},
      },
      intern: {
        elementType: 'input',
        elementConfig: {
          type: 'checkbox',
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        label: "I'm an intern",
      },
    },
  };
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
      },
    };
    this.setState({ controls: updatedControls });
  };
  render() {
    return (
      <div className={classes.NewSoup}>
        <h1>New Supervision</h1>
        <div>{this.props.match.params.id}</div>
        <form>
          <FormSection
            questions={this.state.controls}
            radioChangeHandler={this.inputChangedHandler}
          >
            Session set-up
          </FormSection>
        </form>
      </div>
    );
  }
}
export default NewSoup;
