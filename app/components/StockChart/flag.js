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

    getNewsData() {
      return newsdata;
    }

    getFinData() {
      return this.props.financeData;
    }


    // Single array with the state names for the legend
    getStateNames(retailData) {
      const states = retailData[this.props.currentCategoryIndex].regional_data.map(e => e.state === 'Total' ? 'AUS': e.state);
      return states;
    }

    formatFinanceData(financeData){
      //
      const result = financeData.map((e) => [(new Date(e.date)).getTime(),e.price]).sort();
      //
      return result;
    }

    formatNewsData(newsData){
      newsData = newsData.data;

      const sort_news = (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      const result = newsData.map((e) => {
        return {
          url: window.btoa(e.url),
          x: (new Date(e.date)).getTime(),
          title: 'News'
        }
      }).sort(sort_news);

      return result;
    }

    // Obtain the full series to plot on the chart
    createConfigSeries(formattedNewsData, formattedFinanceData) {
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


      return companySeries;
    }

    // Obtain the x-axis values (dates in milliseconds)
    formatDates(retailData) {
      const firstRegion = retailData[this.props.currentCategoryIndex].regional_data[0].data;
      const configCategories = firstRegion.map((e) => (new Date(e.date)).getTime()).sort();
      return configCategories;
    }

    shouldComponentUpdate (nextProps, nextState) {
      return nextProps.financeData !== this.props.financeData || nextProps.newsData !== this.props.newsData || nextProps.company_name !== this.props.company_name;
    }
    //Create the div which the chart will be rendered to.
    render () {
      const financeData = this.getFinData();
      const formattedFinanceData = this.formatFinanceData(financeData);
      const formattedNewsData = this.formatNewsData(this.getNewsData());


      const { company_name, categories, xrange={}, updateRange=(e)=>e } = this.props;

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
        xAxis: {
          events: {
            afterSetExtremes: function(event){
                
                if (this.getExtremes().dataMin < event.min)
                    updateRange(event.min, event.max);
            }
          },
          ...xrange,
        },
        plotOptions: {
          flags: {
            point: {
              events: {
                click: function (event) {
                  const url = "/#/news/" + this.url;

                  window.location.href = url;
                }
              }
            }
          },
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

        series:this.createConfigSeries( formattedNewsData, formattedFinanceData)
      };
      this.render_obj = (<ReactHighstock config={config} />);
      return this.render_obj;
    }
}
