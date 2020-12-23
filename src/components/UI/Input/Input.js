import React from 'react';
import classes from './Input.module.css';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import orange from '@material-ui/core/colors/orange';
import Button from '../Button/Button';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: orange,
  },
  overrides: {
    MuiPickersBasePicker: {
      pickerView: {
        overflow: 'hidden',
      },
    },
    MuiFormLabel: {
      root: {
        color: '#fff',
      },
    },
    MuiInputBase: {
      input: {
        color: '#fff',
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottomColor: 'rgb(112, 112, 112)',
        },
        '&:hover:not(.Mui-disabled)::before': {
          borderBottomColor: '#fff',
        },
        borderBottomColor: 'red',
      },
    },
  },
});
const input = (props) => {
  let inputElement = null;
  const hideClass = !props.registring ? classes.Hide : null;
  const inputClasses = [classes.InputElement, hideClass];
  const textareaClasses = [classes.InputElement, classes.Textarea];
  if (
    props.invalid &&
    props.shouldValidate &&
    props.touched &&
    props.registring
  ) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          className={textareaClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          onChange={props.changed}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  let render = null;
  if (props.elementConfig.type === 'radio') {
    inputClasses.push(classes.Radio);
    const question = props.elementConfig.question;
    const noteAdded = props.noteAdded ? classes.NoteAdded : null;
    render = (
      <fieldset className={[classes.Fieldset, noteAdded].join(' ')}>
        <h3>{question}</h3>
        {Object.values(props.elementConfig.options).map(
          ([label, value, score], i) => {
            return (
              <label key={label + i} className={classes.Label}>
                <input
                  key={value}
                  className={inputClasses.join(' ')}
                  {...props.elementConfig}
                  value={value}
                  onChange={props.changed}
                  checked={props.value === value}
                />
                <span>{label}</span>
              </label>
            );
          }
        )}
        <Button type="button" btnType="NoBg" clicked={props.clickedAddNote}>
          Add Note
        </Button>
      </fieldset>
    );
  } else if (props.elementType === 'textarea') {
    render = (
      <div className={classes.Input}>
        <h3>{props.elementConfig.question}</h3>
        {/* <label className={classes.Label}>{props.label}</label> */}
        {inputElement}
      </div>
    );
  } else if (props.elementConfig.type === 'date') {
    render = (
      <div className={classes.Input}>
        <h3>{props.elementConfig.question}</h3>
        <ThemeProvider theme={defaultMaterialTheme}>
          <DatePicker
            format="d MMM yyyy"
            value={props.value}
            onChange={props.changed}
            label={props.elementConfig.label}
          />
        </ThemeProvider>
      </div>
    );
  } else if (props.elementConfig.type === 'time') {
    render = (
      <div className={classes.Input}>
        <h3>{props.elementConfig.question}</h3>
        <ThemeProvider theme={defaultMaterialTheme}>
          <TimePicker
            // ampm={false}
            showTodayButton
            todayLabel="now"
            value={props.value}
            label={props.elementConfig.label}
            onChange={props.changed}
          />
        </ThemeProvider>
      </div>
    );
  } else {
    render = (
      <div
        className={classes.Input}
        data-attr={props.elementConfig['data-attr']}
      >
        {inputElement}
        <label className={classes.Label}>{props.label}</label>
      </div>
    );
  }
  return render;
};

export default input;
