import React from 'react';
import { connect } from 'react-redux';
var Highcharts = require('highcharts');
import LoadableComponent from 'components/LoadableComponent';
var data = require('./dummydata.json');
var ReactHighstock = require('react-highcharts/ReactHighstock.src');



const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

export default class StockChart extends React.Component{

    getCategoriesData(retailData) {
      var categoryArray = [];
      for (var key in retailData) {
          categoryArray.push(this.getDataArray(retailData[key].regional_data[0].data));
      }
      return categoryArray;
    }

    getCategoryNames(retailData) {
      var categories = [];
      for (var key in retailData) {
          categories.push(retailData[key].category);
      }
      return categories;
    }
    //This gets the data points for a category array (a sub array from api call)
    //and returns only the data points in the array
    getDataArray(categoryArray) {
      var dataPointArray = [];
      for (var dataPoint in categoryArray) {
        dataPointArray.push(categoryArray[dataPoint].turnover);
      }
      return dataPointArray;
    }

    getData() {
      return data
    }

    createConfig(dataArray, seriesNames) {
      var series = [];
      for (var index in seriesNames) {
        series.push({name: seriesNames[index], data: dataArray[index]});
      }
      return series;
    }

    //Create the div which the chart will be rendered to.
    render () {
      var retailData = this.getData().MonthlyRetailData;
      var dataArray = this.getCategoriesData(retailData);
      var seriesNames = this.getCategoryNames(retailData);

      // set the allowed units for data grouping
		var groupingUnits = [[
			'week',                         // unit name
			[1]                             // allowed multiples
		], [
			'month',
			[1, 2, 3, 4, 6]
		]];

      const config = {
        chart: {
          height: '500px'
        },

		    rangeSelector: {
		        selected: 1
		    },

		    title: {
		        text: 'AAPL Historical'
		    },

		    yAxis: [{
		        title: {
		            text: 'OHLC'
		        },
		        height: 200,
		        lineWidth: 2
		    }, {
		        title: {
		            text: 'Volume'
		        },
		        top: 300,
		        height: 100,
		        offset: 0,
		        lineWidth: 2
		    }],

		    series: [{
		        type: 'line',
		        name: 'AAPL',
		        data: [[1433116800000,130.28,131.39,130.05,130.54],
            [1433203200000,129.86,130.66,129.32,129.96],
            [1433289600000,130.66,130.94,129.90,130.12],
            [1433376000000,129.58,130.58,128.91,129.36],
            [1433462400000,129.50,129.69,128.36,128.65],
            [1433721600000,128.90,129.21,126.83,127.80],
            [1433808000000,126.70,128.08,125.62,127.42],
            [1433894400000,127.92,129.34,127.85,128.88],
            [1433980800000,129.18,130.18,128.48,128.59],
            [1434067200000,128.18,128.33,127.11,127.17],
            [1434926400000,126.10,127.24,125.71,126.92]],
		        dataGrouping: {
					units: groupingUnits
		        }
		    }, {
		        type: 'line',
		        name: 'Volume',
		        data: [[1433116800000,32112797],
            [1433203200000,33667627],
            [1433289600000,30983542],
            [1433376000000,38450118],
            [1433462400000,35626800],
            [1433721600000,52674786],
            [1433808000000,56075420],
            [1433894400000,39087250],
            [1433980800000,35390887],
            [1434067200000,36886246],
            [1434326400000,43988946]],
		        yAxis: 1,
		        dataGrouping: {
					units: groupingUnits
		        }
		    }]
		};
        return (<ReactHighstock config={config}></ReactHighstock>);
    }
}
