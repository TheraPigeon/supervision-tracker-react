import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './FormSection.module.css';

const FormSection = (props) => {
  const [expanded, setExpanded] = useState(false);
  const formElementArray = [];
  const contentClasses = expanded
    ? [classes.Content, classes.Expanded]
    : [classes.Content];
  const styleContent = expanded ? { height: '100%' } : null;
  for (let key in props.questions[props.category]) {
    formElementArray.push({
      id: key,
      category: props.category,
      config: props.questions[props.category][key],
    });
  }

  let form = formElementArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      changed={(e) =>
        props.radioChangeHandler(e, formElement.category, formElement.id)
      }
      shouldValidate={formElement.config.validation}
      invalid={!formElement.config.valid}
      touched={formElement.config.touched}
      label={formElement.config.label}
    />
  ));

  return (
    <div className={classes.FormSection}>
      <h2 onClick={() => setExpanded(!expanded)}>
        <span className={expanded ? classes.Rotate : null}></span>
        {props.children}
      </h2>
      <div className={contentClasses.join(' ')}>{form}</div>
    </div>
  );
};

export default FormSection;
