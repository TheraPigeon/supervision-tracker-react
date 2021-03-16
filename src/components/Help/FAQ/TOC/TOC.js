import React from 'react';
import classes from './TOC.module.css';

const TOC = ({ questions }) => {
  return (
    <div className={classes.TOC}>
      <h1>Table of Contents</h1>
      <ul>
        {questions.map((q) => {
          return <li>{q.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default TOC;
