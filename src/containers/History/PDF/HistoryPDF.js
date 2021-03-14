import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    padding: '40',
    fontSize: '11',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerData: {
    width: '60%',
  },
  headerLogo: {},
  table: {
    marginTop: '20',
    borderTop: '1 solid #000',
  },
  tableGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableCell: {
    display: 'block',
    borderBottom: '1 solid #000',
    borderRight: '1 solid #000',
    width: '100%',
    height: '100%',
    padding: 3,
  },
  tableHeading: {
    fontSize: '14',
    fontWeight: 'semibold',
    borderBottom: '1 solid #000',
    borderRight: '1 solid #000',
    borderLeft: '1 solid #000',
    padding: '3',
  },
});

const SoupPDF = ({ soup, start, end }) => {
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
          wrap={false}
          style={[styles.tableGroup, { borderLeft: '1 solid #000' }]}
        >
          <Text style={[styles.tableCell, { width: '55%' }]} wrap={false}>
            {q.elementConfig.question}
          </Text>
          <Text
            style={[styles.tableCell, { width: '15%', textAlign: 'center' }]}
            wrap={false}
          >
            {answer}
          </Text>
          <Text style={[styles.tableCell, { width: '30%' }]} wrap={false}>
            {q.noteValue}
          </Text>
        </View>
      </React.Fragment>
    );
  };

  const ColumnHeadings = () => {
    return (
      <View
        style={[
          styles.tableGroup,
          {
            textAlign: 'center',
            borderLeft: '1 solid #000',
          },
        ]}
        fixed
      >
        <Text style={[styles.tableCell, { width: '55%' }]}>
          Therapist Responses
        </Text>
        <Text style={[styles.tableCell, { width: '15%' }]}>Score</Text>
        <Text style={[styles.tableCell, { width: '30%' }]}>Feedback</Text>
      </View>
    );
  };
  const SectionHeading = ({ heading, section }) => {
    return (
      <View wrap={false}>
        <View style={styles.tableHeading}>
          <Text>{heading}</Text>
        </View>
        {Object.keys(soup.json[section]).map((key) => {
          return Question(soup.json[section][`${key}`]);
        })}
      </View>
    );
  };
  const sectionConfig = [
    {
      name: 'starting',
      heading: `Session Set-Up - Score: ${soup.starting}`,
    },
    {
      name: 'main',
      heading: `Conducting the Session - Score: ${soup.conducting}`,
    },
    {
      name: 'ending',
      heading: `Ending the Session - Score: ${soup.ending}`,
    },
    {
      name: 'additional',
      heading: 'Additional Metrics',
    },
  ];
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View>
          <View style={styles.header} fixed>
            <View style={styles.headerData}>
              <Text>Therapist: {soup.staff_member_id}</Text>
              <Text>Supervisor: {soup.supervisor_id}</Text>
              <Text>Date: {soup.date}</Text>
              <Text>
                Start: {start} End: {end}
              </Text>
            </View>
            <View style={styles.headerLogo}>
              <Text>Company:</Text>
            </View>
          </View>
          <View style={styles.table}>
            <ColumnHeadings />
            {sectionConfig.map((section) => {
              return (
                <SectionHeading
                  section={section.name}
                  heading={section.heading}
                />
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SoupPDF;

{
  /* <View>
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
</View>; */
}
