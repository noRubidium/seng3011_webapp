import React from 'react';
import { connect } from 'react-redux';
var Highcharts = require('highcharts');
import LoadableComponent from 'components/LoadableComponent';
var data = require('./dummydata.json');


const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

export default class StockChart extends React.Component{

    getData() {
      return data
    }

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

    getDataArray(categoryArray) {

      var dataPointArray = [];
      for (var dataPoint in categoryArray) {
        dataPointArray.push(categoryArray[dataPoint].turnover);
      }
      return dataPointArray;
    }

    // Obtain the
    createConfigSeries(dataArray, seriesNames) {
      var series = [];
      for (var index in seriesNames) {
        series.push({name: seriesNames[index], data: dataArray[index]});
      }
      return series;
    }

    // Obtain the x-axis values (dates in milliseconds)
    createConfigCategories(retailData) {
      var configCategories= [];
      const pattern = '([0-9]{4})-([0-9]{2})-([0-9]{2})'

      for (var i in retailData[0].regional_data[0].data) {
        const date = retailData[0].regional_data[0].data[i].date;
        var matches = date.match(pattern);
        configCategories.push(Date.UTC(matches[1], matches[2], 15));
      }

      return configCategories;
    }

    //Create the div which the chart will be rendered to.
    render () {
      var retailData = this.getData().MonthlyRetailData;
      var dataArray = this.getCategoriesData(retailData);
      var seriesNames = this.getCategoryNames(retailData);
      this.createConfigCategories(retailData);
      const config = {
        xAxis: {
          categories: this.createConfigCategories(retailData)
        },
        series:this.createConfigSeries(dataArray, seriesNames)
      };
        return (<ReactHighcharts config={config}></ReactHighcharts>);
    }
}
