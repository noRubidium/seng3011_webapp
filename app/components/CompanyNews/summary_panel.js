import React from 'react';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import LoadableComponent from 'components/LoadableComponent';

import InfoButton from 'components/InfoButton';

export default class SummaryPanel extends LoadableComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const { emotion={} } = this.props.data;
    const info = [];

    for (let key in emotion) {
        info.push({
            name: key,
            y: emotion[key]
        });
    }

    const config = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 200
        },
        title: {
            style: {
              display: 'none'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
             name: 'Emotion Strength',
             colorByPoint: true,
             data: info,
             colors: ['#ef443e', '#5cce60', '#378ad3', '#c3c4b2', '#a791bf']
         }]
    }

    this.loaded_object = (<div>
        <div> Summary of recent news&apos; emotion
          <InfoButton text={'Summary or recent news\' emotion'} right={true}/>
        </div>
        <ReactHighcharts config={config} />
    </div>);
    return super.render();
  }

}
