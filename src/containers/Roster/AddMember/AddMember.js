import React, { useState } from 'react';
import classes from './AddMember.module.css';
import { connect } from 'react-redux';
// import Backdrop from '../../../components/UI/Backdrop/Backdrop';
// import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index';
const AddMember = (props) => {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [init, setInit] = useState('');
  const [follow, setFollow] = useState(false);
  const addBtn = (
    <React.Fragment>
      <Button clicked={() => setAdding(!adding)}>Add New Member</Button>
    </React.Fragment>
  );
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, init, follow);
    const fullName = name + ' ' + init;
    props.onCreateStaff(fullName, follow, props.clinicId, props.token);
    setAdding(false);
  };
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
        <Button>Add</Button>
        <Button clicked={() => setAdding(false)}>Cancel</Button>
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
    onCreateStaff: (name, isFollow, clinicId, token) =>
      dispatch(actions.createStaff(name, isFollow, clinicId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
