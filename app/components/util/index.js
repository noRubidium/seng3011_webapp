import React from 'react';
import { connect } from 'react-redux';
var Highcharts = require('highcharts');
import LoadableComponent from 'components/LoadableComponent';
var data = require('./dummydata.json');
var ReactHighstock = require('react-highcharts/ReactHighstock.src');
// import Date from 'datejs'



const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

export default class StockChart extends React.Component{

    getData() {
      return data
    }

    getCategoriesData(retailData) {
      var dates = this.formatDates(retailData);
      var categoryArray = [];
      for (var key in retailData) {
          categoryArray.push(this.getDataArray(retailData[key].regional_data[0].data, dates));
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
    getDataArray(categoryArray, dates) {
      var dataPointArray = [];
      for (var index in categoryArray) {
        var whyisitpurple = [dates[index], categoryArray[index].turnover];
        dataPointArray.push(whyisitpurple);
      }
      return dataPointArray;
    }

    // Obtain the
    createConfigSeries(dataArray, seriesNames) {
      // set the allowed units for data grouping
      var groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
      ], [
        'month',
        [1, 2, 3, 4, 6]
      ]];

      var series = [];

      for (var index in seriesNames) {
        series.push({type: 'line', dataGrouping: { units: groupingUnits }, name: seriesNames[index], data: dataArray[index]});
      }
      series.push({
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
        })
      return series;
    }

    // Obtain the x-axis values (dates in milliseconds)
    formatDates(retailData) {
      var configCategories= [];
      const pattern = '([0-9]{4})-([0-9]{2})-([0-9]{2})'

      for (var i in retailData[0].regional_data[0].data) {
        const date = new Date(retailData[0].regional_data[0].data[i].date);
        configCategories.push(date.getTime());
      }

      return configCategories;
    }

    //Create the div which the chart will be rendered to.
    render () {
      var retailData = this.getData().MonthlyRetailData;
      var dataArray = this.getCategoriesData(retailData);
      var seriesNames = this.getCategoryNames(retailData);

      const config = {
        chart: {
          height: '500px',
          zoomType: 'x'
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

        series:this.createConfigSeries(dataArray, seriesNames)
      };
        return (<ReactHighstock config={config}></ReactHighstock>);
    }
}
