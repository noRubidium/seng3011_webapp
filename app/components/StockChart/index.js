import React from 'react';
import { connect } from 'react-redux';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import Highcharts from 'highcharts';
import LoadableComponent from 'components/LoadableComponent';

// Highcharts exporting
var HighchartsExporting = require('highcharts-exporting');

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
      const result = financeData.map((e) => [(new Date(e.date)).getTime(),e.price]);
      return result;
    }

    // Obtain the full series to plot on the chart
    createConfigSeries(dataArray, stateNames, formattedFinanceData) {
      // set the allowed units for data grouping
      const groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
      ], [
        'month',
        [1, 2, 3, 4, 6]
      ]];

      const stateSeries = stateNames.map((e, i) => {
        return {type: 'line', dataGrouping: { units: groupingUnits },
                name: e, data: dataArray[i],
                visible: e === 'AUS'};
      });

      const companySeries = [{
          type: 'line',
          name: 'Stock',
          data: formattedFinanceData,
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits
          }
        }];

      const series = stateSeries.concat(companySeries);
      return series;
    }

    // Obtain the x-axis values (dates in milliseconds)
    formatDates(retailData) {
      const firstRegion = retailData[this.props.currentCategoryIndex].regional_data[0].data;
      const configCategories = firstRegion.map((e) => (new Date(e.date)).getTime());
      return configCategories;
    }

    //Create the div which the chart will be rendered to.
    render () {
      HighchartsExporting(ReactHighstock.Highcharts);
      const retailData = this.getData().MonthlyRetailData;
      const dataArray = this.getDataForStates(retailData);
      const stateNames = this.getStateNames(retailData);
      const financeData = this.getFinData();
      const formattedFinanceData = this.formatFinanceData(financeData);

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
		        selected: 4
		    },

		    yAxis: [{
		        title: {
		            text: 'Retail Turnover (million AUD)'
		        },
		        height: 200,
		        lineWidth: 2
		    }, {
		        title: {
		            text: 'Stock Price'
		        },
		        top: 280,
		        height: 100,
		        offset: 0,
		        lineWidth: 2
		    }],

        series:this.createConfigSeries(dataArray, stateNames, formattedFinanceData)
      };
        return (<ReactHighstock config={config} />);
    }
}
