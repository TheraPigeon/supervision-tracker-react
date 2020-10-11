import React from 'react';

const viewSection = (props) => {
  const soupArray = [];
  for (let key in props.questions[props.category]) {
    soupArray.push({
      id: key,
      category: props.category,
      config: props.questions[props.category][key],
    });
  }
  let soup = soupArray.map((soupElement) => {
    let answer = null;
    const value = soupElement.config.value;
    switch (value) {
      case 'Y':
        answer = 'Yes';
        break;
      case 'N':
        answer = 'No';
        break;
      case 'E':
        answer = 'Excellent';
        break;
      case 'S':
        answer = 'Satisfactory';
        break;
      case 'NI':
        answer = 'Needs improvement';
        break;
      default:
        answer = 'N/A';
    }
    return (
      <tr key={soupElement.id}>
        <td>{soupElement.config.elementConfig.question}</td>
        <td>{answer}</td>
        <td>note</td>
      </tr>
    );
  });
  return (
    <React.Fragment>
      <thead>
        <tr>
          <td>{props.category}</td>
        </tr>
      </thead>
      <tbody>{soup}</tbody>
    </React.Fragment>
  );
};

export default viewSection;
