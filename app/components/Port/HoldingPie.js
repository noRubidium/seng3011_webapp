import React from 'react';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import LoadableComponent from 'components/LoadableComponent';

export default class HoldingPie extends LoadableComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const { holdings=[] } = this.props;
    const info = holdings
      .filter((h) => h.amount !== 0)
      .map((h) => {
        return {name: h.company, y: h.price * h.amount};
      });
    if (info.length === 0 ) return <div></div>;
    const config = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Your current holding'
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
             name: 'Portfolio Share',
             colorByPoint: true,
             data: info
         }]
    }

    this.loaded_object = (<div>
        <ReactHighcharts config={config} />
    </div>);
    return super.render();
  }

}
