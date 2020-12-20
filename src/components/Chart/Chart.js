import React from 'react'
import { Line } from 'react-chartjs-2'
import { cloneDeep } from 'lodash';

import classes from './Chart.module.css'

export default class Chart extends React.Component {
    state = {
        loading: true,
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
                    soupCategory: 'total'
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
                    hidden: true

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
                    hidden: true
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
                    hidden: true

                },
            ],
        },
        chartOptions: {
            title: {
                display: true,
                text:'Soup Scores Over Time'
            },
            maintainAspectRation: false,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage'
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date of Supervision'
                    }
                }]
            }
        },
    }
    componentDidMount(){
        this.updateChart();
    }
    // shouldComponentUpdate(nextProps, prevState){
    //     console.log('[Chart.js] - shouldComponentUpdate')
    //     console.log(this.props.soups)
    //     if(this.props.soups !== nextProps.soups && this.state.loading){
    //         this.updateChart();
    //     }
    // }
    shouldComponentUpdate = (nextState) => {
        if (this.state.soups === nextState.soups) {
          return false;
        }
        this.updateChart();

        return true;
      };
    // componentWillUnmount() {
    //     console.log('[Chart.js] - componentWillUnmount')
    //     this.setState({loading: true, chartData: null})
    // }
    updateChart() {
        console.log(this.state.loading)
        const isDenomZero = (datapoint) => {
            const denom = datapoint.split('/')[1]
            return denom === '0' ? true : false
        }
        
        const formatDataPoint = (datapoint) => {
            const [num, denom] = datapoint.split('/')
            return(parseInt((parseInt(num)/parseInt(denom) * 100)))
        }
        const soupData = {
            total: [],
            starting: [],
            conducting: [],
            ending: [],
            labels: []
        }
        this.props.soups.map((soup) => {
            // If the data is not a valid fraction - don't render this point
            console.log(soup.starting)
            if (isDenomZero(soup.total)) {
                console.log('Skipping this one.')
            } else {
                const categories = {
                    total: null,
                    starting: null,
                    conducting: null,
                    ending: null
                }  
                Object.keys(categories).map(category => {
                    if (isDenomZero(soup[category])) {
                        soupData[category].push(null)
                    } else {
                        let dataPoint = formatDataPoint(soup[category])
                        soupData[category].push(dataPoint)
                    }
                })
                // Passes each Soup's date to be used as a label on the X-Axis
                soupData.labels.push(soup.date)
            }
                
        })

        const {total, starting, conducting, ending, labels} = soupData
        const updatedConfig = cloneDeep(this.state.chartData)
        const categories = ['total', 'starting', 'conducting', 'ending']
        updatedConfig.datasets.map((dataset, index) => {
            console.log(dataset)
            const category = categories[index]
            console.log(soupData[category])
            dataset.data = soupData[category];
        })
        updatedConfig.labels = labels;
        console.log(this.state)
     
        console.log(updatedConfig['_meta'])
        this.setState({ chartData: updatedConfig, loading: false })
        
    }
   
    render() {
        return(
            <div className={classes.Chart}>
                {!this.state.loading ?(
                    <Line 
                    data={this.state.chartData}
                    options={this.state.chartOptions}
                />
                ) : null}
               
            </div>
        )
    } 
}

