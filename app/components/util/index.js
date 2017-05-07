import React from 'react';
import { connect } from 'react-redux';
const Highcharts = require('highcharts');
import LoadableComponent from 'components/LoadableComponent';
const data = require('./dummydata.json');
const financeData = require('./financedata.json');
const ReactHighstock = require('react-highcharts/ReactHighstock.src');

const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

export default class StockChart extends React.Component{

    getData() {
      return this.props.absData;
    }

    getFinData() {
      return this.props.financeData;
    }
    // 9 arrays, one for each state and one for total
    getDataForStates(retailData) {  //only one is given
      const dates = this.formatDates(retailData);
      var stateArrays = [];
      for (var state in retailData[0].regional_data) {  //for each state get the datapoints
        stateArrays.push(this.getDataArray(retailData[0].regional_data[state].data, dates));
      }
      return stateArrays;
    }

    // For the state array given, create a 2D array
    // date in milliseconds -> datapoint
    getDataArray(stateArray, dates) {
      var dataPointArray = [];
      for (var index in stateArray) {
        var stateData = [dates[index], stateArray[index].turnover];
        dataPointArray.push(stateData);
      }
      return dataPointArray;
    }

    // Single array with the state names for the legend
    getStateNames(retailData) {
      var categories = [];
      for (var key in retailData[0].regional_data) {
        if (retailData[0].regional_data[key].state == "Total") {  //replace TOTAL with AUS
          categories.push("AUS");
        } else {
          categories.push(retailData[0].regional_data[key].state);
        }
      }
      return categories;
    }

    formatFinanceData(financeData){
      const result = financeData.map((e) => {
        return [(new Date(e.date)).getTime(),e.price];
      });
      return result;
    }

    // Obtain the full series to plot on the chart
    createConfigSeries(dataArray, stateNames, formattedFinanceData) {
      // set the allowed units for data grouping
      var groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
      ], [
        'month',
        [1, 2, 3, 4, 6]
      ]];

      var series = [];

      for (var index in stateNames) {
        if (stateNames[index] == "AUS") {
          series.push({type: 'line', dataGrouping: { units: groupingUnits },
                      name: stateNames[index], data: dataArray[index]});
        } else {
          series.push({type: 'line', dataGrouping: { units: groupingUnits },
                      name: stateNames[index], data: dataArray[index],
                      visible:false});
        }
      }
      series.push({
          type: 'line',
          name: 'Stock',
          data: formattedFinanceData,
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits
          }
        })
      return series;
    }

    // Obtain the x-axis values (dates in milliseconds)
    formatDates(retailData) {
      var configCategories= [];

      for (var i in retailData[0].regional_data[0].data) {
        const date = new Date(retailData[0].regional_data[0].data[i].date);
        configCategories.push(date.getTime());
      }
      return configCategories;
    }

    //Create the div which the chart will be rendered to.
    render () {
      const retailData = this.getData().MonthlyRetailData;
      const dataArray = this.getDataForStates(retailData);
      const stateNames = this.getStateNames(retailData);
      const financeData = this.getFinData();
      const formattedFinanceData = this.formatFinanceData(financeData);

      const config = {
        legend: {
          enabled: true,
          align: 'right',
          layout: 'vertical',
          verticalAlign: 'top',
          y: 100,
        },
        chart: {
          height: '500px',
          zoomType: 'x'
        },

		    rangeSelector: {
		        selected: 1
		    },

		    title: {
		        text: 'Passed in from SUPER'
		    },

		    yAxis: [{
		        title: {
		            text: 'Million dollar'
		        },
		        height: 200,
		        lineWidth: 2
		    }, {
		        title: {
		            text: 'Stock Price'
		        },
		        top: 300,
		        height: 100,
		        offset: 0,
		        lineWidth: 2
		    }],

        series:this.createConfigSeries(dataArray, stateNames, formattedFinanceData)
      };
        return (<ReactHighstock config={config}></ReactHighstock>);
    }
}
