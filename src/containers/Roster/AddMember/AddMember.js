import React, { useState } from 'react';
import classes from './AddMember.module.css';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Input from '../../../components/UI/Input/Input';

const AddMember = (props) => {
  const [adding, setAdding] = useState(false);
  const addBtn = (
    <React.Fragment>
      <i class="fa fa-cog"></i>
      <p>Manage</p>
    </React.Fragment>
  );
  const submitHandler = (e) => {
    e.preventDefault();
    setAdding(false);
  };
  const form = (
    <React.Fragment>
      {/* <Backdrop show={adding} clicked={() => setAdding(false)} /> */}
      <form onSubmit={(e) => submitHandler(e)}>
        <input placeholder="Name" />
        <input placeholder="Init" />
        <button>add</button>
      </form>
    </React.Fragment>
  );
  return (
    <div className={classes.AddMember} onClick={() => setAdding(true)}>
      {adding ? form : addBtn}
    </div>
  );
};

export default AddMember;
