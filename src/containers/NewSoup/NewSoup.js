import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import FormSection from '../../components/FormSection/FormSection';
import Button from '../../components/UI/Button/Button';
import classes from './NewSoup.module.css';
class NewSoup extends Component {
  mainSelection = [
    ['Yes', 'Y'],
    ['No', 'N'],
    ['N/A', 'NA'],
  ];
  additionalMetricsSelection = [
    ['Excellent', 'E'],
    ['Satisfactory', 'S'],
    ['Mas o menos', 'M'],
    ['Needs Improvement', 'NI'],
  ];
  state = {
    controls: {
      setup: {
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
      },
      main: {
        q3: {
          elementType: 'input',
          elementConfig: {
            type: 'radio',
            name: 'q3',
            options: cloneDeep(this.mainSelection),
            question: 'Sets up materials/curriculum/data sheets for session',
          },
          value: '',
          validation: {},
        },
      },
      ending: {
        q4: {
          elementType: 'input',
          elementConfig: {
            type: 'radio',
            name: 'q4',
            options: cloneDeep(this.mainSelection),
            question: 'Sets up materials/curriculum/data sheets for session',
          },
          value: '',
          validation: {},
        },
      },
      additional: {
        q5: {
          elementType: 'input',
          elementConfig: {
            type: 'radio',
            name: 'q5',
            options: cloneDeep(this.additionalMetricsSelection),
            question: 'Sets up materials/curriculum/data sheets for session',
          },
          value: '',
          validation: {},
        },
        q6: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            question: 'Improvements from previous session',
          },
          value: '',
          validation: {},
          // label: 'Improvements from previous session',
        },
        q7: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            question: 'Suggestions for next session',
          },
          value: '',
          validation: {},
          // label: 'Suggestions for next session',
        },
      },
    },
  };
  inputChangedHandler = (event, category, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [category]: {
        ...this.state.controls[category],
        [controlName]: {
          ...this.state.controls[category][controlName],
          value: event.target.value,
        },
      },
    };
    this.setState({ controls: updatedControls });
  };
  render() {
    console.log(this.props);
    return (
      <div className={classes.NewSoup}>
        <header>
          <h1>
            New Supervision <span>for {this.props.location.name}</span>
          </h1>
          <span>14%</span>
        </header>

        <form>
          <FormSection
            questions={this.state.controls}
            radioChangeHandler={this.inputChangedHandler}
            category="setup"
          >
            Session set-up
          </FormSection>
          <FormSection
            questions={this.state.controls}
            radioChangeHandler={this.inputChangedHandler}
            category="main"
          >
            Conducting the session
          </FormSection>
          <FormSection
            questions={this.state.controls}
            radioChangeHandler={this.inputChangedHandler}
            category="ending"
          >
            Ending the session
          </FormSection>
          <FormSection
            questions={this.state.controls}
            radioChangeHandler={this.inputChangedHandler}
            category="additional"
          >
            Additional Metrics
          </FormSection>
          <Button>Submit</Button>
        </form>
      </div>
    );
  }
}
export default NewSoup;
