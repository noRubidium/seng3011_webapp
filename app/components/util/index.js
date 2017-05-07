import React from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

import LoadableComponent from 'components/LoadableComponent';

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
      const stateArrays = retailData[0].regional_data.map(e => this.getDataArray(e.data, dates));
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
      const states = retailData[0].regional_data.map(e => e.state === 'Total' ? 'AUS': e.state);
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

      let series = stateNames.map((e, i) => {
        return {type: 'line', dataGrouping: { units: groupingUnits },
                name: e, data: dataArray[i],
                visible: e === 'AUS'};
      });
      series.push({
          type: 'line',
          name: 'Stock',
          data: formattedFinanceData,
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits
          }
        });
      return series;
    }

    // Obtain the x-axis values (dates in milliseconds)
    formatDates(retailData) {
      const firstRegion = retailData[0].regional_data[0].data;
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

      const { company_name, categories } = this.props;

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
		        text: `Stats for company: ${company_name}`
		    },

		    yAxis: [{
		        title: {
		            text: `${categories[0]} Reatail Turnover (million AUD)`
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
