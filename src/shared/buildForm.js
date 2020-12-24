import React from 'react';
import Input from '../components/UI/Input/Input';
export const buildForm = (controls, inputChangedHandler) => {
  const formElementArray = [];
  for (let key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementArray.map((formElement) => {
    // if (formElement.config.elementConfig['data-attr'] === 'intern-login') {
    //   return false;
    // }
    return (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(e) =>
          inputChangedHandler({
            event: e,
            controlName: formElement.id,
          })
        }
        shouldValidate={formElement.config.validation}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        label={formElement.config.label}
      />
    );
  });
  return form;
};
