import React from 'react';
import { connect } from 'react-redux';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import Highcharts from 'highcharts';
import LoadableComponent from 'components/LoadableComponent';
import newsdata from './newsdata.json';

// Highcharts exporting
var HighchartsExporting = require('highcharts-exporting');
HighchartsExporting(ReactHighstock.Highcharts);

export default class StockChartFlag extends React.Component{

    getData() {
      return this.props.absData;
    }

    getNewsData() {
      return newsdata;
    }

    getFinData() {
      return this.props.financeData;
    }

    // 9 arrays, one for each state and one for total
    getDataForStates(retailData) {  //only one is given
      const dates = this.formatDates(retailData);
      const stateArrays = retailData[this.props.currentCategoryIndex].regional_data.map(e => this.getDataArray(e.data, dates));
      return stateArrays;
    }

    // For the state array given, create a 2D array
    // date in milliseconds -> datapoint
    getDataArray(stateArray, dates) {
      const dataPointArray = stateArray.map((e, i) => [dates[i], e.turnover]);
      return dataPointArray;
    }

    // Single array with the state names for the legend
    getStateNames(retailData) {
      const states = retailData[this.props.currentCategoryIndex].regional_data.map(e => e.state === 'Total' ? 'AUS': e.state);
      return states;
    }

    formatFinanceData(financeData){
      // console.log(financeData[1].date);
      const result = financeData.map((e) => [(new Date(e.date)).getTime(),e.price]);
      // console.log(result);
      return result;
    }

    formatNewsData(newsData){
      newsData = newsData.data;

      const result = newsData.map((e) => {
        return {
          url: window.btoa(e.url),
          x: (new Date(e.date)).getTime(),
          title: 'News'
        }
      });
      console.log(result);
      return result;
    }

    // Obtain the full series to plot on the chart
    createConfigSeries(dataArray, formattedNewsData, formattedFinanceData) {
      // set the allowed units for data grouping
      const groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
      ], [
        'month',
        [1, 2, 3, 4, 6]
      ]];

      // const stateSeries = stateNames.map((e, i) => {
      //   return {type: 'line', dataGrouping: { units: groupingUnits },
      //           name: e, data: dataArray[i],
      //           visible: e === 'AUS'};
      // });

      const companySeries = [{
          type: 'line',
          id: 'Stock',
          name: 'Stock',
          data: formattedFinanceData,
          dataGrouping: {
            units: groupingUnits
          }
        },{
	        type: 'flags',
	        name: 'Flags on series',
	        data: formattedNewsData,
          onSeries: 'Stock',
	        shape: 'squarepin'
  		}];

      console.log(companySeries);
      return companySeries;
    }

    // Obtain the x-axis values (dates in milliseconds)
    formatDates(retailData) {
      const firstRegion = retailData[this.props.currentCategoryIndex].regional_data[0].data;
      const configCategories = firstRegion.map((e) => (new Date(e.date)).getTime());
      return configCategories;
    }

    //Create the div which the chart will be rendered to.
    render () {
      const retailData = this.getData().MonthlyRetailData;
      const dataArray = this.getDataForStates(retailData);
      const stateNames = this.getStateNames(retailData);
      const financeData = this.getFinData();
      const formattedFinanceData = this.formatFinanceData(financeData);
      const formattedNewsData = this.formatNewsData(this.getNewsData());


      const { company_name, categories } = this.props;

      const config = {

        exporting: {
          chartOptions: { // specific options for the exported image
              plotOptions: {
                  series: {
                      dataLabels: {
                          enabled: true
                      }
                  }
              }
          },
          fallbackToExportServer: false
        },

        plotOptions: {
          flags: {
            point: {
              events: {
                click: function (event) {
                  const url = "/#/news/" + this.url;
                  console.log(url);
                  window.location.href = url;
                }
              }
            }
          }
    },

        chart: {
          height: '500px',
          zoomType: 'x'
        },

		    rangeSelector: {
		        selected: 4
		    },

		    yAxis: [{
		        title: {
		            text: 'Stock Price (AUD)'
		        },
		        lineWidth: 2
		    }],

        series:this.createConfigSeries(dataArray, formattedNewsData, formattedFinanceData)
      };
        return (<ReactHighstock config={config} />);
    }
}
