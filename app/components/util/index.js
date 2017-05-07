import React from 'react';
import { connect } from 'react-redux';
var Highcharts = require('highcharts');
import LoadableComponent from 'components/LoadableComponent';
var data = require('./dummydata.json');


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

      const config = {
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series:this.createConfig(dataArray, seriesNames)
      };
        return (<ReactHighcharts config={config}></ReactHighcharts>);
    }
}
