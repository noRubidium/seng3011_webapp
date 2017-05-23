import React from 'react';
import { connect } from 'react-redux';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import LoadableComponent from 'components/LoadableComponent';
import data from './data.json';

// Highcharts exporting
var HighchartsExporting = require('highcharts-exporting');
HighchartsExporting(ReactHighstock.Highcharts);

export default class SentimentChart extends React.Component{
    getData() {
      return this.props.data;
    }

    createRealSeries(emotionsData) {
        const dataPointArray = [];

        dataPointArray.push(emotionsData.anger*100);
        dataPointArray.push(emotionsData.joy*100);
        dataPointArray.push(emotionsData.sadness*100);
        dataPointArray.push(emotionsData.fear*100);
        dataPointArray.push(emotionsData.disgust*100);

        return dataPointArray;
    }

    createGreyedSeries(emotionsData) {
      const dataPointArray = [];

      dataPointArray.push((1-emotionsData.anger)*100);
      dataPointArray.push((1-emotionsData.joy)*100);
      dataPointArray.push((1-emotionsData.sadness)*100);
      dataPointArray.push((1-emotionsData.fear)*100);
      dataPointArray.push((1-emotionsData.disgust)*100);

      return dataPointArray;
    }

    //Create the div which the chart will be rendered to.
    render () {
        // const emotionsData = this.props.emotionsData;
        const emotionsData = {emotion: this.getData()};
        

        const config = {
          plotOptions: {
            series: {
              animation: {
                duration: 1000,
              },
              stacking: 'normal',
              colorByPoint: true,
              showInLegend: false,
              backgroundColor: null,
              dataLabels: {
                enabled: true,
                align: 'right',
                color: '#000',
                formatter: function() {
                  var number = Highcharts.numberFormat(1-(this.y/100), 2);
                  var toReturn = (number < 0.5) ? " UNLIKELY" : (number > 0.75) ? " VERY LIKELY" : " LIKELY";
                  return number + toReturn;
                },
                inside: true,
              }
            },
          },

          chart: {
              type: 'bar',
              backgroundColor: null,
              height: '250px',
              animation: {
                duration: 1000
              }
          },

          title: {
              text: null
          },

          xAxis: {
              categories: ['Anger', 'Joy', 'Sadness', 'Fear', 'Disgust'],
              labels: {
                style: {
                  fontweight: 'bold',
                  color: 'black',
                  fontSize:'12px'
                }
              },
              width: 20
          },

          yAxis: {
              min: 0,
              max: 100,
              title: {
                  text: ''
              }
          },

          legend: {
              reversed: true
          },

        	tooltip: {
              valueDecimals: 1,
            	valueSuffix: '%',
              formatter: function() {
              	return Highcharts.numberFormat(this.y, 2) + '%';
          	}
          },

          series: [{
              data: this.createGreyedSeries(emotionsData.emotion),
              enableMouseTracking: false,
              colors: ['#E6E6E6', '#E6E6E6', '#E6E6E6', '#E6E6E6', '#E6E6E6'],
              pointWidth: 15
          }, {
              data: this.createRealSeries(emotionsData.emotion),
              colors: ['#FB6262', '#89C980', '#8087C9', '#A44C4C', '#AE80C9'],
              dataLabels: false,
              pointWidth: 15
          }]

        };

        return (<ReactHighcharts config={config} />);
    }
}
