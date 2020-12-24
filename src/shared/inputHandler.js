import { checkValidity } from './checkValidity';
import { cloneDeep } from 'lodash';

export const inputHandler = ({ event, controlName }, controls) => {
  const updatedControls = cloneDeep(controls);
  updatedControls[controlName].value = event.target.value;
  updatedControls[controlName].valid = checkValidity(
    event.target.value,
    controls[controlName].validation
  );
  updatedControls[controlName].touched = true;
  if (controlName === 'intern') {
    updatedControls[controlName].checked = event.target.checked;
  }
  return updatedControls;
};
