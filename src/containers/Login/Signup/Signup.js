import React, { useState, useEffect, useRef, useCallback } from 'react';
import { buildForm } from '../../../shared/buildForm';
import { inputHandler } from '../../../shared/inputHandler';
import classes from './Signup.module.css';
import Button from '../../../components/UI/Button/Button';
const Signup = (props) => {
  let [formConfig, setFormConfig] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        'data-attr': 'name-login',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      label: 'Name(required)',
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        'data-attr': 'email-login',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      label: 'Email(required)',
    },
    intern: {
      elementType: 'input',
      elementConfig: {
        type: 'checkbox',
        'data-attr': 'intern-login',
      },
      value: '',
      validation: {},
      valid: true,
      touched: false,
      label: "I'm an intern",
    },
  });
  const [form, setForm] = useState();

  const inputChangedHandler = ({ event, controlName }) => {
    const updatedControls = inputHandler({ event, controlName }, formConfig);
    setFormConfig(updatedControls);
    const updatedForm = buildForm(updatedControls, inputChangedHandler);
    setForm(updatedForm);
  };

  useEffect(() => {
    const formInit = buildForm(formConfig, inputChangedHandler);
    setForm(formInit);
  }, [formConfig]);

  return (
    <div className={classes.Signup}>
      <h1>Step 2: Please finish signing up</h1>
      <form>
        {form}
        <Button>Continue</Button>
      </form>
    </div>
  );
};

export default Signup;
