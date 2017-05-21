import React from 'react';
import { connect } from 'react-redux';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import Highcharts from 'highcharts';
import LoadableComponent from 'components/LoadableComponent';

// Highcharts exporting
var HighchartsExporting = require('highcharts-exporting');

HighchartsExporting(ReactHighstock.Highcharts);
// data: [{'label': sth, values: [{value:sth, date:sth}]}]
export default class GenericChart extends React.Component{

    getData() {
      return this.props.data;
    }

    // 9 arrays, one for each state and one for total
    getDataForStates(data) {  //only one is given
      const stateArrays = data.map(e => this.getDataArray(e.values));
      return stateArrays;
    }

    // For the state array given, create a 2D array
    // date in milliseconds -> datapoint
    getDataArray(stateArray) {
      const dataPointArray = stateArray.map((e) =>
        [(new Date(e.date)).getTime(), e.value]
      );
      return dataPointArray;
    }

    // Single array with the state names for the legend
    getLabels(data) {
      const labels = data.map((e) => e.label);
      return labels;
    }

    // Obtain the full series to plot on the chart
    createConfigSeries(dataArray, labels) {
      // set the allowed units for data grouping
      const groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
      ], [
        'month',
        [1, 2, 3, 4, 6]
      ]];

      const beautifulData = labels.map((e, i) => {
        return {
          type: 'line',
          dataGrouping: {
            units: groupingUnits
          },
          name: e,
          data: dataArray[i]
        };
      });
      return beautifulData;
    }


    //Create the div which the chart will be rendered to.
    render () {
      const data = this.getData();
      const dataArray = this.getDataForStates(data);
      const labels = this.getLabels(data);

      

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
          height: 500,
          zoomType: 'x'
        },

        rangeSelector: {
            selected: 8
        },

		    yAxis: [{
		        title: {
		            text: 'Retail Turnover (million AUD)'
		        },
		        height: 300,
		        lineWidth: 2
		    }],
        series: this.createConfigSeries(dataArray, labels)
      };
      return (<ReactHighstock config={config} />);
    }
}
