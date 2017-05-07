import React from 'react';
import { connect } from 'react-redux';
var Highcharts = require('highcharts');
import LoadableComponent from 'components/LoadableComponent';
var data = require('./dummydata.json');


const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

export default class StockChart extends React.Component{

    // getCategories(data) {
    //
    //   return array
    // }

    getData() {
      return data
    }
    //Create the div which the chart will be rendered to.
    render () {
      console.log(this.getData().MonthlyRetailData);
      const config = {
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
          name:"Pranav",
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
        },
        {
          name:"Vaishnavi",
          data: [129.9, 171.5, 1106.4, 1219.2, 1144.0, 11761.0, 11315.6, 1418.5, 2116.4, 1914.1, 2195.6, 4514.4]
        }]

      };
        return (<ReactHighcharts config={config}></ReactHighcharts>);
    }
}