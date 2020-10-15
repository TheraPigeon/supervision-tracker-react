import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import FormSection from '../../components/FormSection/FormSection';
import Button from '../../components/UI/Button/Button';
import classes from './NewSoup.module.css';

import axios from '../../axios-soup';
import { connect } from 'react-redux';

class NewSoup extends Component {
  mainSelection = {
    0: ['Yes', 'Y', 1],
    1: ['No', 'N', 0],
    2: ['N/A', 'NA', null],
  };
  additionalMetricsSelection = {
    0: ['Excellent', 'E', 2],
    1: ['Satisfactory', 'S', 1],
    2: ['Needs Improvement', 'NI', 0],
    3: ['N/A', 'NA', null],
  };
  setupSessionType = {
    0: ['In-Person', 'in_person'],
    1: ['Telehealth', 'telehealth'],
  };
  setupSessionArrangement = {
    0: ['Solo', 'solo'],
    1: ['Group', 'group'],
  };
  state = {
    controls: {
      setup: {
        0: {
          elementType: 'input',
          elementConfig: {
            type: 'date',
            name: '0',
            // label: 'Date',
            question: 'Date of the session',
          },
          value: Date.now(),
          validation: {
            required: true,
          },
          valid: true,
        },
        1: {
          elementType: 'input',
          elementConfig: {
            type: 'time',
            name: 'start_time',
            label: 'Start time',
          },
          value: new Date(Date.now()),
          validation: {
            required: true,
          },
          valid: true,
        },
        2: {
          elementType: 'input',
          elementConfig: {
            type: 'time',
            name: 'end_time',
            label: 'End time',
          },
          value: new Date(Date.now() + 60000 * 60),
          validation: {
            required: true,
          },
          valid: true,
        },
        3: {
          elementType: 'input',
          elementConfig: {
            type: 'radio',
            name: 'telehealth',
            options: cloneDeep(this.setupSessionType),
            question: 'Type of session',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
        4: {
          elementType: 'input',
          elementConfig: {
            type: 'radio',
            name: 'group',
            options: cloneDeep(this.setupSessionArrangement),
            question: 'Type of Session',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
      },
      starting: {
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
  componentDidMount() {
    console.log('[NewSoup.js componentDidMount');
    if (this.props.location.edit) {
      this.setState({ controls: cloneDeep(this.props.location.controls) });
    }
  }
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
    let updatedControls = null;
    if (event instanceof Date) {
      updatedControls = {
        ...this.state.controls,
        [category]: {
          ...this.state.controls[category],
          [controlName]: {
            ...this.state.controls[category][controlName],
            value: event,
          },
        },
      };
    } else {
      updatedControls = {
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
    }
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
    const adjustTimeZone = (value) =>
      new Date(value.getTime() - value.getTimezoneOffset() * 60000);
    const data = {
      soup: {
        staff_member_id: this.props.match.params.id,
        supervisor_id: this.props.staffId,
        start_time: adjustTimeZone(this.state.controls.setup['1'].value),
        end_time: adjustTimeZone(this.state.controls.setup['2'].value),
        date: this.state.controls.setup['0'].value,
        group: this.state.controls.setup['4'].value === 'group',
        telehealth: this.state.controls.setup['3'].value === 'telehealth',
        starting: calculatedScores.starting,
        conducting: calculatedScores.main,
        ending: calculatedScores.ending,
        total: calculatedScores.total,
        json: this.state.controls,
      },
    };
    const strigify = JSON.stringify(data);
    const parse = JSON.parse(strigify);
    const url = 'api/supervisions';
    axios
      .post(url, parse, {
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
    const formOrder = [
      ['setup', 'Session set-up'],
      ['starting', 'Starting the session'],
      ['main', 'Conducting the session'],
      ['ending', 'Ending the session'],
      ['additional', 'Additional Metrics'],
    ];
    const formSections = formOrder.map(([category, sectionLabel]) => {
      return (
        <FormSection
          questions={this.state.controls}
          radioChangeHandler={this.inputChangedHandler}
          category={category}
          sectionLabel={sectionLabel}
        />
      );
    });
    return (
      <div className={classes.NewSoup}>
        <header>
          <h1>
            New Supervision <span>for {this.props.location.name}</span>
          </h1>
          <span>14%</span>
        </header>
        <form onSubmit={(e) => this.formSubmitHandler(e)}>
          {formSections}
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
    staffId: state.auth.userId,
    isIntern: state.auth.isIntern,
  };
};

export default connect(mapStateToProps)(NewSoup);
