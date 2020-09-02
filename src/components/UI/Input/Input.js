import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const hideClass = !props.registring ? classes.Hide : null;
  const inputClasses = [classes.InputElement, hideClass];
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
          className={inputClasses.join(' ')}
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
  return (
    <div className={classes.Input}>
      {inputElement}
      <label className={classes.Label}>{props.label}</label>
    </div>
  );
};

export default input;
