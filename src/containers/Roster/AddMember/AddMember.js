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
  const addBtn = (
    <React.Fragment>
      <Button clicked={() => setAdding(!adding)}>Add New Member</Button>
    </React.Fragment>
  );
  const submitHandler = (e) => {
    e.preventDefault();
    const fullName = name + ' ' + init;
    props.onCreateStaff(fullName, follow, props.clinicId, hours, props.token);
    resetForm();
  };
  const resetForm = () => {
    setAdding(false);
    setName('');
    setInit('');
    setFollow(false);
  };
  const hoursSelection = [];
  for (let i = 0; i <= 100; i++) {
    hoursSelection.push(
      <option key={'hour' + i} value={i}>
        {i}
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
        <label>
          Follow?
          <input
            value={follow}
            onChange={(e) => setFollow(e.target.checked)}
            type="checkbox"
          />
        </label>
        <select value={hours} onChange={(e) => setHours(e.target.value)}>
          {hoursSelection}
        </select>
        <Button>Add</Button>
        <Button clicked={() => resetForm()} btnType="Transparent">
          Cancel
        </Button>
      </form>
    </React.Fragment>
  );
  return (
    <div className={classes.AddMember}>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
