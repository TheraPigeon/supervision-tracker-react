import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import FormSection from '../../components/FormSection/FormSection';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Note from './Note/Note';
import classes from './NewSoup.module.css';
import { initialState } from './initialState';
import { connect } from 'react-redux';
import { checkValidity } from '../../shared/checkValidity';
import { validateForm } from '../../shared/validateForm';
import { formatToTimeZone } from 'date-fns-timezone';

import * as actions from '../../store/actions/index';

class NewSoup extends Component {
  state = initialState;

  componentDidMount() {
    console.log('[NewSoup.js componentDidMount');
    if (this.props.location.soupId) {
      this.props.fetchSoup(this.props.location.soupId);
    }
  }
  updateForm = () => {
    const {
      id,
      date,
      start_time,
      end_time,
      group,
      telehealth,
      supervisor_id,
      staff_member_id,
      json,
    } = this.props.soup;

    const fetchedControls = cloneDeep(json);
    const soupDate = formatToTimeZone(new Date(date), 'MMM D, YYYY', {
      timeZone: 'Africa/Conakry',
    });
    const startTime = new Date(start_time);
    startTime.setTime(
      startTime.getTime() + startTime.getTimezoneOffset() * 60 * 1000
    );
    const endTime = new Date(end_time);
    endTime.setTime(
      endTime.getTime() + endTime.getTimezoneOffset() * 60 * 1000
    );
    let updatedControls = {
      ...fetchedControls,
      setup: {
        ...fetchedControls.setup,
        0: {
          ...fetchedControls.setup['0'],
          value: date,
        },
        1: {
          ...fetchedControls.setup['1'],
          value: startTime,
        },
        2: {
          ...fetchedControls.setup['2'],
          value: endTime,
        },
      },
    };
    this.setState({ controls: updatedControls });
  };
  componentDidUpdate = (prevProps) => {
    console.log('[NewSoup.js componentDidUpdate');
    if (this.props.soup !== prevProps.soup) {
      this.updateForm();
    }
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
            valid: checkValidity(
              event.target.value,
              this.state.controls[category].validation
            ),
          },
        },
      };
    }
    this.setState({ controls: updatedControls });
    const formIsValid = validateForm(updatedControls);
    this.setState({ formIsValid: formIsValid });
  };
  inputNoteHandler = (event, category, controlName) => {
    let updatedControls = null;
    updatedControls = {
      ...this.state.controls,
      [category]: {
        ...this.state.controls[category],
        [controlName]: {
          ...this.state.controls[category][controlName],
          noteValue: event.target.value,
        },
      },
    };
    this.setState({ controls: updatedControls });
  };

  formSubmitHandler = (e, options) => {
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
          case 'A':
            sectionScore += 0.5;
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

      calculatedScores[section] = sectionScore + '/' + amountOfQuestions;
    }

    const adjustTimeZone = (value) =>
      new Date(
        new Date(value).getTime() - new Date(value).getTimezoneOffset() * 60000
      );

    const data = {
      soup: {
        staff_member_id: parseInt(this.props.match.params.id),
        supervisor_id: this.props.staffId,
        start_time: adjustTimeZone(this.state.controls.setup['1'].value),
        end_time: adjustTimeZone(this.state.controls.setup['2'].value),
        date: adjustTimeZone(this.state.controls.setup['0'].value),
        group: this.state.controls.setup['4'].value === 'group',
        telehealth: this.state.controls.setup['3'].value === 'telehealth',
        starting: calculatedScores.starting,
        conducting: calculatedScores.main,
        ending: calculatedScores.ending,
        additional: calculatedScores.additional,
        total: totalSectionScore + '/' + totalQuestions,
        intern: this.props.isIntern,
        in_progress: options ? options.inProgress : false,
        json: this.state.controls,

        created_at: new Date(Date.now()), //REVIEW
      },
    };

    this.props.onAddSoup({
      soupData: data,
      soupId: this.props.location.soupId,
      token: this.props.token,
      edit: this.props.location.edit,
      memberId: this.props.match.params.id,
    });
    this.props.history.goBack();
    e.preventDefault();
  };
  generateNote = (e) => {
    const notes = [];
    Object.keys(this.state.controls).map((category) => {
      Object.keys(this.state.controls[category]).map((question) => {
        const note = this.state.controls[category][question].noteValue;
        if (note) {
          notes.push(note);
        }
      });
    });
    const formattedNotes = notes.map((note) => {
      note = note.trim().split('');
      if (note[note.length - 1] !== '.') {
        note.push('.');
      }
      note[0] = note[0].toUpperCase();
      return note.join('');
    });
    const finalNote = formattedNotes.join(' ');
    this.inputChangedHandler(
      {
        target: {
          value: finalNote,
        },
      },
      'note',
      'n0'
    );
  };
  handleAddNote = () => {
    this.generateNote();
    this.handleModal();
  };
  handleModal = (category, questionId, noteValue) => {
    if (!this.state.addingNote) {
      //fetch one soup
      this.setState((prevState) => {
        return {
          addingNote: !prevState.addingNote,
          questionCategory: category,
          questionId: questionId,
          noteValue: noteValue,
        };
      });
    } else {
      this.setState((prevState) => {
        return { addingNote: !prevState.addingNote };
      });
    }
  };
  handleNoteDelete = () => {
    let updatedControls = null;

    updatedControls = {
      ...this.state.controls,
      [this.state.questionCategory]: {
        ...this.state.controls[this.state.questionCategory],
        [this.state.questionId]: {
          ...this.state.controls[this.state.questionCategory][
            this.state.questionId
          ],
          noteValue: '',
        },
      },
    };
    this.setState({ controls: updatedControls });
    this.handleModal();
  };
  handleSaveProgress = (e) => {
    this.formSubmitHandler(e, { inProgress: true });
  };
  render() {
    const formOrder = [
      ['setup', 'Session set-up'],
      ['starting', 'Starting the session'],
      ['main', 'Conducting the session'],
      ['ending', 'Ending the session'],
      ['additional', 'Additional Metrics'],
      ['note', 'Session Note'],
    ];
    const formSections = formOrder.map(([category, sectionLabel], i) => {
      return (
        <FormSection
          key={category + i}
          questions={this.state.controls}
          radioChangeHandler={this.inputChangedHandler}
          category={category}
          sectionLabel={sectionLabel}
          clicked={this.handleModal}
        />
      );
    });

    return (
      <React.Fragment>
        <Modal
          show={this.state.addingNote}
          modalClosed={() => this.handleModal()}
        >
          <Note
            questionId={this.state.questionId}
            questionCategory={this.state.questionCategory}
            changed={this.inputNoteHandler}
            saveClicked={() => this.handleAddNote()}
            deleteClicked={this.handleNoteDelete}
            value={
              this.state.questionId
                ? this.state.controls[this.state.questionCategory][
                    this.state.questionId
                  ].noteValue
                : ''
            }
          />
        </Modal>
        <div className={classes.NewSoup}>
          <header>
            <h1>
              Supervision <span>for {this.props.location.name}</span>
            </h1>
            {/* span to display completion percentage */}
            <span></span>
          </header>
          <form onSubmit={(e) => this.formSubmitHandler(e)}>
            {formSections}
            <section>
              <Button
                type="button"
                btnType="Transparent"
                clicked={(e) => this.handleSaveProgress(e)}
              >
                Save&amp;Exit
              </Button>
              <Button type="submit" disabled={!this.state.formIsValid}>
                Submit
              </Button>
            </section>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    staffId: state.auth.userId,
    isIntern: state.auth.isIntern,
    roster: state.auth.roster,
    members: state.allmembers.members,

    soup: state.history.soup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddSoup: (data) => dispatch(actions.addSoup(data)),
    fetchSoup: (soupId) => dispatch(actions.fetchSoup(soupId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSoup);
