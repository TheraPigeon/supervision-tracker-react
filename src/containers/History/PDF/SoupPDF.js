import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

const styles = {
  scoreCard: {
    width: '150px',
    height: '150px',
    backgroundColor: '#363940',
    margin: '10px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '20px',
  },
  cardHeader: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
  },
  cardScore: {
    color: 'white',
    fontSize: '40pt',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30px',
  },
};

const Question = (q) => {
  if (q.value === 'NA') {
    return null;
  }
  let answer;

  switch (q.value) {
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
    case '':
    case 'NA':
      answer = 'N/A';
      break;
    default:
      answer = q.value;
  }

  return (
    <React.Fragment>
      <View
        style={{
          display: 'flex',
          alignText: 'left',
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginLeft: '20px',
          marginTop: '10px',
          fontSize: '11',
        }}
      >
        <Text style={{ marginRight: '20px', width: '258px' }}>
          {q.elementConfig.question}
        </Text>
        <Text style={{ width: '100px' }}>{answer}</Text>
        {q.noteValue !== '' ? <Text>{q.noteValue}</Text> : null}
      </View>
    </React.Fragment>
  );
};

const SectionHeading = ({ heading }) => {
  return (
    <View>
      <Text
        style={{
          marginLeft: '20px',
          marginTop: '5px',
          marginBottom: '5px',
          fontSize: '13',
        }}
      >
        {heading}
      </Text>
    </View>
  );
};

const ColumnHeadings = () => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        fontSize: '12',
        marginLeft: '20px',
        marginRight: '50px',
      }}
    >
      <Text>Therapist Responses</Text>
      <Text>Score</Text>
      <Text>Feedback</Text>
    </View>
  );
};

const SoupPDF = ({ soup, start, end }) => {
  console.log(soup);
  return (
    <Document style={{ paddingBottom: '20px' }}>
      <Page size="A4">
        <View style={{ marginTop: '20px', fontSize: '11' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Text style={{ margin: '2px', marginLeft: '20px' }}>
              Therapist: {soup.staff_member_id}
            </Text>
            <Text style={{ margin: '2px', marginLeft: '20px' }}>
              Date: {soup.date}
            </Text>
          </View>

          <Text style={{ margin: '2px', marginLeft: '20px' }}>
            Supervisor: {soup.supervisor_id}
          </Text>

          <Text style={{ margin: '2px', marginLeft: '20px' }}>
            Start: {start} End: {end}
          </Text>
        </View>

        <Text style={{ marginTop: '2px', fontSize: '11', marginLeft: '20px' }}>
          Scores:
        </Text>

        <View
          style={{
            marginTop: '2px',
            marginLeft: '20px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginRight: '40px',
            fontSize: '11',
          }}
        >
          <Text style={{ marginBottom: '5px', marginRight: '5px' }}>
            Set-Up: {soup.starting}
          </Text>
          <Text style={{ marginBottom: '5px', marginRight: '5px' }}>
            Conducting: {soup.conducting}
          </Text>
          <Text style={{ marginBottom: '5px', marginRight: '5px' }}>
            Ending: {soup.ending}
          </Text>
          <Text style={{ marginBottom: '5px', marginRight: '5px' }}>
            Total: {soup.total}
          </Text>
        </View>

        <SectionHeading heading={`Session Set-Up - Score: ${soup.starting}`} />

        <ColumnHeadings />

        {Object.keys(soup.json.starting).map((key) => {
          return Question(soup.json.starting[`${key}`]);
        })}

        <SectionHeading
          heading={`Conducting the Session - Score: ${soup.conducting}`}
        />

        {Object.keys(soup.json.main).map((key) => {
          return Question(soup.json.main[`${key}`]);
        })}

        <SectionHeading
          heading={`Ending the Session - Score: ${soup.ending}`}
        />

        {Object.keys(soup.json.ending).map((key) => {
          return Question(soup.json.ending[`${key}`]);
        })}

        <SectionHeading heading="Additional Metrics" />

        {Object.keys(soup.json.additional).map((key) => {
          return Question(soup.json.additional[`${key}`]);
        })}
      </Page>
    </Document>
  );
};

export default SoupPDF;
