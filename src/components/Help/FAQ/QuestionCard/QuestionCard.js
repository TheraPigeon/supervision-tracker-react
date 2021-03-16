import React, { useState } from 'react';
import classes from './QuestionCard.module.css';

const QuestionCard = ({ question }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={classes.QuestionCard} onClick={() => setActive(!active)}>
      <div>
        <h3>{question.title}</h3>
        <span className={active ? classes.Rotate : null}></span>
        {/* <span>{active ? '-' : '+'}</span> */}
      </div>

      {active ? <p>{question.answer}</p> : null}
    </div>
  );
};

export default QuestionCard;
