import React, { useState } from 'react';
import classes from './AddMember.module.css';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index';
const AddMember = (props) => {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [init, setInit] = useState('');
  const [follow, setFollow] = useState(false);
  const [hours, setHours] = useState(40);
  if (props.editing && !adding) {
    const { name, hours, follow } = props.memberData;
    const [first, init] = name.split(' ');
    setAdding(true);
    setName(first);
    setInit(init);
    setFollow(follow);
    setHours(hours);
  }
  const addBtn = (
    <React.Fragment>
      <Button clicked={() => setAdding(!adding)}>Add New Member</Button>
    </React.Fragment>
  );
  const submitHandler = (e) => {
    e.preventDefault();
    const fullName = name + ' ' + init;
    if (props.editing) {
      const staffData = {
        name: fullName,
        hours: hours,
        staffId: props.staffId,
      };
      props.onEditStaff(staffData, props.token);
    } else {
      props.onCreateStaff(fullName, follow, props.clinicId, hours, props.token);
    }
    resetForm();
  };
  const resetForm = () => {
    if (props.editing) {
      props.cancelEditing();
    }
    setAdding(false);
    setName('');
    setInit('');
    setFollow(false);
  };
  const hoursSelection = [];
  for (let i = 0; i <= 100; i++) {
    hoursSelection.push(
      <option key={'hour' + i} value={i}>
        {i}h
      </option>
    );
  }
  const form = (
    <React.Fragment>
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={init}
          onChange={(e) => setInit(e.target.value)}
          placeholder="Init"
        />
        {!props.editing ? (
          <label>
            Follow?
            <input
              checked={follow}
              onChange={(e) => setFollow(e.target.checked)}
              type="checkbox"
            />
          </label>
        ) : null}

        <select value={hours} onChange={(e) => setHours(e.target.value)}>
          {hoursSelection}
        </select>
        <span>/ week</span>
        <Button>{props.editing ? 'Save' : 'Add'}</Button>
        <Button type="button" clicked={() => resetForm()} btnType="NoBg">
          Cancel
        </Button>
      </form>
    </React.Fragment>
  );
  return (
    <div className={classes.AddMember} style={props.style}>
      {!adding ? addBtn : null}
      {adding ? form : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    clinicId: state.auth.currentClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateStaff: (name, isFollow, clinicId, hours, token) =>
      dispatch(actions.createStaff(name, isFollow, clinicId, hours, token)),
    onEditStaff: (staffData, token) =>
      dispatch(actions.editStaff(staffData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
