import React, { useState, useEffect } from 'react';
import classes from './QuestionCard.module.css';
import UsefulLinks from './UsefulLinks/UsefulLinks';

const QuestionCard = ({ question, id, startActive }) => {
  const [active, setActive] = useState(startActive);

  useEffect(() => {
    setActive(startActive || question.active);
  }, [startActive, question]);

  return (
    <div
      id={id}
      className={classes.QuestionCard}
      onClick={() => setActive(!active)}
    >
      <div>
        <h3>{question.title}</h3>
        <span className={active ? classes.Rotate : null}></span>
      </div>

      {active ? <p>{question.answer}</p> : null}
      {active ? (
        <UsefulLinks links={question.links ? question.links : []} />
      ) : null}
    </div>
  );
};

export default QuestionCard;
