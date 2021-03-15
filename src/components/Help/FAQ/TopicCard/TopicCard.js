import React from 'react';
import classes from './TopicCard.module.css';

const TopicCard = ({ topic, index, changeTopic }) => {
  return (
    <div className={classes.TopicCard} onClick={() => changeTopic(index)}>
      <h1>{topic.title}</h1>
    </div>
  );
};

export default TopicCard;
