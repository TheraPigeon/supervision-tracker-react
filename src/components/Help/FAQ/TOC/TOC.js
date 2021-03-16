import React from 'react';
import classes from './TOC.module.css';

const TOC = ({
  questions,
  updateQuestions,
  allQuestions,
  topic,
  forceUpdate,
}) => {
  return (
    <div className={classes.TOC}>
      <h1>Table of Contents</h1>
      <ul>
        {questions.map((q, index) => {
          return (
            <li
              onClick={() => {
                const qes = allQuestions;
                qes.topics[topic].questions[index].activate = true;
                updateQuestions(qes);
                forceUpdate();
                const target = document.getElementById(index);
                target.scrollTop += 20;

                window.setTimeout(() => {
                  target.scrollIntoView({
                    block: 'end',
                    inline: 'nearest',
                    behavior: 'smooth',
                  });
                }, 1);
              }}
            >
              {q.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TOC;
