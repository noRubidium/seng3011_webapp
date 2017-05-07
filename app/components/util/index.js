import React from 'react';
import { connect } from 'react-redux';
var Highcharts = require('highcharts');
import LoadableComponent from 'components/LoadableComponent';
var data = require('./dummydata.json');


const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

class StockChart extends React.Component{

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

    getData() {
      return data
    }

    createConfig(dataArray, seriesNames) {

    }

    //Create the div which the chart will be rendered to.
    render () {
      var retailData = this.getData().MonthlyRetailData;
      var dataArray = this.getCategoriesData(retailData);
      var seriesNames = this.getCategoryNames(retailData);

      this.crateConfig(dataArray, seriesNames);

      const config = {
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
          name:"Pranav",
          data: dataArray[0]
        },
        {
          name:"Vaishnavi",
          data: dataArray[1]
        }]

      };
        return (<ReactHighcharts config={config}></ReactHighcharts>);
    }
}
