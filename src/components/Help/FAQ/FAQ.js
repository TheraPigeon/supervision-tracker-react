import React, { useState, useRef, createRef, useEffect } from 'react';
import classes from './FAQ.module.css';
import qa from './qa';
import TopicCard from './TopicCard/TopicCard';
import QuestionCard from './QuestionCard/QuestionCard';
import TableOfContents from './TOC/TOC';

const FAQ = () => {
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState(qa);
  const [remountCount, setRemountCount] = useState(0);
  const refresh = () => setRemountCount(remountCount + 1);

  useEffect(() => {
    const qes = questions;
    qes.topics.map((t) => {
      t.questions.map((q) => {
        q.activate = false;
      });
    });

    setQuestions(qes);
  }, [remountCount]);

  return (
    <div className={classes.FAQ}>
      <h1>
        {topic !== null
          ? `FAQ - ${questions.topics[topic].title}`
          : 'Frequently Asked Questions'}
      </h1>

      {topic != null ? (
        <button
          onClick={() => {
            setTopic(null);
            setQuestions(null);
            setQuestions({ ...qa });
            refresh();
          }}
        >
          BACK
        </button>
      ) : null}

      {topic != null ? (
        <TableOfContents
          questions={questions.topics[topic].questions}
          allQuestions={questions}
          topic={topic}
          updateQuestions={setQuestions}
          forceUpdate={refresh}
        />
      ) : null}

      <h2>{topic == null ? 'Topics' : 'Questions'}</h2>

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
          {questions.topics[topic].questions.map((q, qIndex) => {
            return (
              <QuestionCard
                question={q}
                id={qIndex}
                startActive={q.activate === true ? true : false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FAQ;
