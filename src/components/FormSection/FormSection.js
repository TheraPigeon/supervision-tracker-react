import React from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './FormSection.module.css';

const formSection = (props) => {
  const formElementArray = [];
  for (let key in props.questions) {
    formElementArray.push({
      id: key,
      config: props.questions[key],
    });
  }

  let form = formElementArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      changed={(e) => props.radioChangeHandler(e, formElement.id)}
      shouldValidate={formElement.config.validation}
      invalid={!formElement.config.valid}
      touched={formElement.config.touched}
      label={formElement.config.label}
    />
  ));
  return (
    <div className={classes.FormSection}>
      <h2>{props.children}</h2>
      {form}
    </div>
  );
};

export default formSection;
