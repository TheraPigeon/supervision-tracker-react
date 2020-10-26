import React from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Note.module.css';
const note = (props) => (
  <div className={classes.Note}>
    <Input
      elementConfig={{ type: 'textarea' }}
      elementType="textarea"
      value={props.value}
      changed={(event) =>
        props.changed(event, props.questionCategory, props.questionId)
      }
    />
    <div>
      <Button clicked={props.saveClicked} type="button" btnType="Transparent">
        Save
      </Button>
      <Button clicked={props.deleteClicked} type="button">
        Delete
      </Button>
    </div>
  </div>
);

export default note;
