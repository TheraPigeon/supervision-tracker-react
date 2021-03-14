import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { cloneDeep } from 'lodash';

import classes from './Chart.module.css';

class Chart extends Component {
  state = {
    chartData: {
      labels: null,
      datasets: [
        {
          label: 'Total Percentage for Session',
          data: [0],
          fill: false,
          lineTension: 0,
          borderColor: '#4dc1c1',
          pointBackgroundColor: 'black',
          pointRadius: 5,
          spanGaps: true,
          soupCategory: 'total',
        },
        {
          label: 'Starting Percentage for Session',
          data: [0],
          fill: false,
          lineTension: 0,
          borderColor: 'orange',
          pointBackgroundColor: 'black',
          pointRadius: 5,
          spanGaps: true,
          soupCategory: 'starting',
          hidden: true,
        },
        {
          label: 'Conducting Percentage for Session',
          data: [0],
          fill: false,
          lineTension: 0,
          borderColor: 'red',
          pointBackgroundColor: 'black',
          pointRadius: 5,
          spanGaps: true,
          soupCategory: 'conducting',
          hidden: true,
        },
        {
          label: 'Ending Percentage for Session',
          data: [0],
          fill: false,
          lineTension: 0,
          borderColor: 'purple',
          pointBackgroundColor: 'black',
          pointRadius: 5,
          spanGaps: true,
          soupCategory: 'ending',
          hidden: true,
        },
      ],
    },
    chartOptions: {
      title: {
        display: true,
        text: 'Soup Scores Over Time',
      },
      maintainAspectRation: false,
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage',
            },
          },
        ],
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date of Supervision',
            },
          },
        ],
      },
    },
  };
  updateChart() {
    const isDenomZero = (datapoint) => {
      const denom = datapoint.split('/')[1];
      return denom === '0' ? true : false;
    };
    const formatDataPoint = (datapoint) => {
      const [num, denom] = datapoint.split('/');
      return parseInt((parseInt(num) / parseInt(denom)) * 100);
    };
    const soupData = {
      total: [],
      starting: [],
      conducting: [],
      ending: [],
      labels: [],
    };
    this.props.soups.reverse().map((soup) => {
      if (soup.in_progress) return; // TEMP fetch with in_progress false
      // If the data is not a valid fraction - don't render this point
      if (isDenomZero(soup.total)) {
        console.log('Skipping this one.');
      } else {
        const categories = {
          total: null,
          starting: null,
          conducting: null,
          ending: null,
        };
        Object.keys(categories).map((category) => {
          if (isDenomZero(soup[category])) {
            soupData[category].push(null);
          } else {
            let dataPoint = formatDataPoint(soup[category]);
            soupData[category].push(dataPoint);
          }
          return true;
        });
        // Passes each Soup's date to be used as a label on the X-Axis
        soupData.labels.push(soup.date);
      }
      return true;
    });

    const updatedConfig = cloneDeep(this.state.chartData);
    const categories = ['total', 'starting', 'conducting', 'ending'];
    updatedConfig.datasets.map((dataset, index) => {
      const category = categories[index];
      dataset.data = soupData[category];
      return true;
    });
    updatedConfig.labels = soupData.labels;
    return updatedConfig;
  }

  render() {
    let line = null;
    if (this.props.soups) {
      const chartData = this.updateChart();
      line = <Line data={chartData} options={this.state.chartOptions} />;
    }
    return <div className={classes.Chart}>{line}</div>;
  }
}

export default Chart;
