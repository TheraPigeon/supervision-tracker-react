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
      case 'A':
        answer = 'Almost';
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
        <td>{soupElement.config.noteValue}</td>
      </tr>
    );
  });
  let sectionTitle = null;
  switch (props.category) {
    case 'starting':
      sectionTitle = 'Session set-up';
      break;
    case 'main':
      sectionTitle = 'Conducting the session';
      break;
    case 'ending':
      sectionTitle = 'Ending session';
      break;
    case 'additional':
      sectionTitle = 'Additional Metrics';
      break;
    default:
      return (sectionTitle = null);
  }
  return (
    <React.Fragment>
      <thead>
        <tr>
          <td>{sectionTitle}</td>
          {props.score ? (
            <td
              style={{
                fontStyle: 'italic',
                fontSize: '1rem',
                textAlign: 'end',
              }}
            >
              {' '}
              Score: {props.score}
            </td>
          ) : null}
        </tr>
      </thead>
      <tbody>{soup}</tbody>
    </React.Fragment>
  );
};

export default viewSection;
