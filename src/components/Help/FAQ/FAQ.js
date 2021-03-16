import React, { useState } from 'react';
import classes from './FAQ.module.css';
import qa from './qa';
import TopicCard from './TopicCard/TopicCard';
import QuestionCard from './QuestionCard/QuestionCard';

const FAQ = () => {
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState(qa);

  return (
    <div className={classes.FAQ}>
      <h1>
        {topic !== null
          ? `FAQ - ${questions.topics[topic].title}`
          : 'Frequently Asked Questions'}
      </h1>

      <h2>{topic == null ? 'Topics' : 'Questions'}</h2>

      {topic != null ? (
        <button onClick={() => setTopic(null)}>BACK</button>
      ) : null}

      {topic === null ? (
        <div className={classes.topicsWrapper}>
          {questions.topics.map((topic, index) => {
            return (
              <TopicCard topic={topic} index={index} changeTopic={setTopic} />
            );
          })}
        </div>
      ) : (
        <div className={classes.questionsWrapper}>
          {questions.topics[topic].questions.map((q) => {
            return <QuestionCard question={q} />;
          })}
        </div>
      )}
    </div>
  );
};

export default FAQ;
