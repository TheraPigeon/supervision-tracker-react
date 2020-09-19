import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import FormSection from '../../components/FormSection/FormSection';
import Button from '../../components/UI/Button/Button';
import classes from './NewSoup.module.css';

import axios from '../../axios-soup';
import { connect } from 'react-redux';

class NewSoup extends Component {
  mainSelection = [
    ['Yes', 'Y', 1],
    ['No', 'N', 0],
    ['N/A', 'NA', null],
  ];
  additionalMetricsSelection = [
    ['Excellent', 'E', 2],
    ['Satisfactory', 'S', 1],
    ['Needs Improvement', 'NI', 0],
    ['N/A', 'NA', null],
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
          validation: {
            required: true,
          },
          valid: false,
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
          validation: {
            required: true,
          },
          valid: false,
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
          validation: {
            required: true,
          },
          valid: false,
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
          validation: {
            required: true,
          },
          valid: false,
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
          validation: {
            required: true,
          },
          valid: false,
        },
        q6: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            question: 'Improvements from previous session',
          },
          value: '',
          validation: {},
          valid: true,
        },
        q7: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            question: 'Suggestions for next session',
          },
          value: '',
          validation: {},
          valid: true,
        },
      },
    },
    scores: {
      start: null,
      main: null,
      end: null,
      total: null,
    },
    formIsValid: false,
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
  checkValidity = (value, rules) => {
    if (!rules) return true;
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  };
  inputChangedHandler = (event, category, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [category]: {
        ...this.state.controls[category],
        [controlName]: {
          ...this.state.controls[category][controlName],
          value: event.target.value,
          valid: this.checkValidity(
            event.target.value,
            this.state.controls[category].validation
          ),
        },
      },
    };
    this.setState({ controls: updatedControls });
    this.validateForm(updatedControls);
  };
  formSubmitHandler = (e) => {
    const updateScore = {
      ...this.state.controls,
    };
    const calculatedScores = {};
    let totalQuestions = 0;
    let totalSectionScore = 0;
    for (let section in updateScore) {
      let sectionScore = 0;
      let amountOfQuestions = 0;
      for (let question in updateScore[section]) {
        const value = updateScore[section][question].value;
        switch (value) {
          case 'Y':
            sectionScore += 1;
            amountOfQuestions += 1;
            break;
          case 'N':
            amountOfQuestions += 1;
            break;
          case 'E':
            sectionScore += 2;
            amountOfQuestions += 2;
            break;
          case 'S':
            sectionScore += 1;
            amountOfQuestions += 2;
            break;
          case 'NI':
            amountOfQuestions += 2;
            break;
          default:
            continue;
        }
      }
      totalQuestions += amountOfQuestions;
      totalSectionScore += sectionScore;
      if (section === 'additional') {
        calculatedScores['total'] = totalSectionScore + '/' + totalQuestions;
      } else {
        calculatedScores[section] = sectionScore + '/' + amountOfQuestions;
      }
    }

    this.setState({ scores: calculatedScores });
    console.log(calculatedScores);
    const data = {
      soup: {
        staff_member_id: '1',
        supervisor_id: '1',
        start_time: '12:00',
        end_time: '14:00',
        date: 'date',
        group: 'false',
        telehealth: 'false',
      },
    };
    const url = 'api/supervisions';
    axios
      .post(url, data, {
        headers: {
          Authorization: 'Token ' + this.props.token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    e.preventDefault();
  };
  render() {
    console.log(this.state);
    return (
      <div className={classes.NewSoup}>
        <header>
          <h1>
            New Supervision <span>for {this.props.location.name}</span>
          </h1>
          <span>14%</span>
        </header>

        <form onSubmit={(e) => this.formSubmitHandler(e)}>
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
          <Button type="submit" disabled={!this.state.formIsValid}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(NewSoup);
