import React from 'react';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import LoadableComponent from 'components/LoadableComponent';

export default class SummaryPanel extends LoadableComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const { emotion={}, sentiment={} } = this.props.data;
    const info = [];

    info.push({
      name: 'Anger',
      y:emotion.anger
    },{
      name: 'Joy',
      y:emotion.joy
    },{
      name: 'Sadness',
      y:emotion.sadness
    },{
      name: 'Fear',
      y:emotion.fear
    },{
      name: 'Disgust',
      y:emotion.disgust
    });

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
                }
            }
        },
        series: [{
             name: 'Emotion Strength',
             colorByPoint: true,
             data: info,
             colors: ['#FB6262', '#89C980', '#8087C9', '#A44C4C', '#CE8CE3']
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
        }],

    }

    this.loaded_object = (<div>
        <div style={{'height':'50%'}}>
          <ReactHighcharts config={sentimentConfig} />
        </div>
        <div style={{'height':'50%'}}>
          <ReactHighcharts config={config} />
        </div>
    </div>);
    return super.render();
  }

}
