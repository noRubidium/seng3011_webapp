import React from 'react';
import { connect } from 'react-redux';
var Highcharts = require('highcharts');
import LoadableComponent from 'components/LoadableComponent';
var data = require('./dummydata.json');
var financeData = require('./financedata.json');
var ReactHighstock = require('react-highcharts/ReactHighstock.src');

const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

export default class StockChart extends React.Component{

    getData() {
      return data
    }

    getFinData() {
      return financeData
    }
    // 9 arrays, one for each state and one for total
    getDataForStates(retailData) {  //only one is given
      var dates = this.formatDates(retailData);
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
      var array = [];
      for (var index in financeData) {
        if(financeData[index].Trading_Info){
          var closePrice = financeData[index].Trading_Info.Close;
          const date = new Date(financeData[index].Date);
          array.push([date.getTime(),closePrice])
        }
      }
      return array;
    }

    // Obtain the full series to plot on the chart
    createConfigSeries(dataArray, seriesNames, formattedFinanceData) {
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
      var retailData = this.getData().MonthlyRetailData;
      var dataArray = this.getDataForStates(retailData);
      var stateNames = this.getStateNames(retailData);
      var financeData = this.getFinData().CompanyReturns[0].Data;
      var formattedFinanceData = this.formatFinanceData(financeData);

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
		            text: 'SOME METRIC'
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

        series:this.createConfigSeries(dataArray, seriesNames, formattedFinanceData)
      };
        return (<ReactHighstock config={config}></ReactHighstock>);
    }
}
