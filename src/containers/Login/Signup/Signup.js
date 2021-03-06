import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { buildForm } from '../../../shared/buildForm';
import { inputHandler } from '../../../shared/inputHandler';
import { validateForm } from '../../../shared/validateForm';
import classes from './Signup.module.css';
import Button from '../../../components/UI/Button/Button';
import { cloneDeep } from 'lodash';
import * as actions from '../../../store/actions/index';
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
        minLength: 2,
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
      touched: true,
      label: "I'm an intern",
    },
  });
  const [form, setForm] = useState();
  const [validForm, setValidForm] = useState(false);
  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //api call here
    if (validForm) {
      const name = formConfig.name.value;
      const intern = formConfig.intern.checked;
      props.onUpdateUserProfile({ name, intern, token: props.token });
      history.push('/join');
    }
  };
  const { email } = props;
  useEffect(() => {
    const inputChangedHandler = ({ event, controlName }) => {
      const updatedControls = inputHandler({ event, controlName }, formConfig);
      setFormConfig(updatedControls);
      const updatedForm = buildForm(updatedControls, inputChangedHandler);
      setForm(updatedForm);
      setValidForm(validateForm({ login: updatedControls }));
    };
    const updatedConfig = cloneDeep(formConfig);
    if (email) {
      delete updatedConfig.email;
    }
    const formInit = buildForm(updatedConfig, inputChangedHandler);
    setForm(formInit);
  }, [formConfig, email]);
  useEffect(() => {
    const updatedConfig = cloneDeep(formConfig);
    if (email) {
      delete updatedConfig.email;
      setFormConfig(updatedConfig);
    }
    // eslint-disable-next-line
  }, [email]);

  return (
    <div className={classes.Signup}>
      <h1>Step 2: Please finish signing up</h1>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        {form}
        <Button>finish</Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    emailIsVerified: state.auth.emailIsVerified,
    isNewUser: state.auth.isNewUser,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUserProfile: (data) => dispatch(actions.updateUserProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
