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
    const { emotion={}, sentiment={} } = this.props.data;
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
            height: '220px'
        },
        title: {
            text: 'Emotion Breakdown',
            style: {'fontSize':'16px'}
        },
        subtitle: {
          text: '(of recent news articles)'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                size: '115px',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    distance: 7,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}%',
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

    const sentimentInfo = [];
    for (let key in sentiment) {
        sentimentInfo.push({
            name: key,
            y: sentiment[key]['count']
        });
    }

    console.log(this.props);

    const sentimentConfig = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '180px'
        },
        colors: ['green', '#da0b0b'],
        title: {
            text: 'Sentiment Breakdown',
            style: {'fontSize':'16px'}
        },
        subtitle: {
          text: '(of recent news articles)'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                size: '160px',
                dataLabels: {
                    enabled: true,
                    distance: 5
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '100%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Sentiment Share',
            innerSize: '65%',
            data: sentimentInfo
        }]

    }

    this.loaded_object = (<div>
        <div> Summary of recent news&apos; emotion
          <InfoButton text={'Summary or recent news\' emotion'} right={true}/>
        </div>
        <ReactHighcharts config={sentimentConfig} />
        <ReactHighcharts config={config} />
    </div>);
    return super.render();
  }

}
