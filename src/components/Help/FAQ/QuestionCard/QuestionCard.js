import React, { useState } from 'react';
import classes from './QuestionCard.module.css';

const QuestionCard = ({ question }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={classes.QuestionCard} onClick={() => setActive(!active)}>
      <div className={classes.headingContainer}>
        <h1>{question.title}</h1>
        <h1>{active ? '-' : '+'}</h1>
      </div>

      {active ? <p>{question.answer}</p> : null}
    </div>
  );
};

export default QuestionCard;
