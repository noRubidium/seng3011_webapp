import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats } from 'actions/company/stats';
import { getStandardDev, getMean, findTrend } from 'utils/statsUtil';

import StockChartFlag from 'components/StockChart/flag.js';

import InfoButton from 'components/InfoButton';


@connect((store) => {
  return {
    ...store.company.company_stats,
    news: store.company.company_news,
  };
})
export default class CompanyInfo extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    this.state = {
      min: 0,
      max: new Date(),
    };
  }

  componentWillMount() {
    const { loading, dispatch, cid } = this.props;
    if (!loading) {
      load_company_stats(cid, dispatch, this.props);
    }
  }

  componentDidUpdate() {
    const { loading, dispatch, cid } = this.props;
    if (!loading) {
      load_company_stats(cid, dispatch, this.props);
    }
  }

  updateRange (min, max) {
    if (min !== this.state.min || max !== this.state.max) {
      this.setState({min, max});
    }
  }
  render () {
    const { loaded, company_name } = this.props;
    if (loaded) {
      this.other_child = <CompanyStatistics {...this.state} data={this.props.financeData}/>;
      this.chart = <StockChartFlag financeData={this.props.financeData}
      company_name={company_name} newsData={this.props.news.news} updateRange={this.updateRange.bind(this)}/>;
      this.loaded_object = (<div className='row'>
        <div className='col-sm-12 col-md-8'>
          {this.chart}
        </div>
        <div className='col-sm-12 col-md-4'>
          {this.other_child}
        </div>
      </div>);
    }
    return super.render();
  }
}


const toCompanyStatsItems = (data, min, max, f) => {
  return data
  .map((d) => {
    return {label: d.label, value: f(d.values, min, max)};
  })
  .map((d) =>
    <StatCompareItem company={d.label} value={d.value.toFixed(2)}/>
  );
}

class CompanyStatistics extends React.Component {

  getPositiveHeight(rate) {
    if (rate >= 0) {
      if (rate > 0.1) {
        return 0;
      } else {
        return (0.1 - rate)*1000;
      }
    } else {
      return 100;
    }
  }

  getNegativeHeight(rate) {
    if (rate < 0) {
      if (rate < -0.098) {
        return 98;
      } else {
        return Math.abs(rate*1000);
      }
    } else {
      return 0;
    }
  }


  render () {
    const { min, max, data } = this.props;
    const minDate = new Date(min);
    const maxDate = new Date(max);
    const [m, b] = findTrend(data, minDate, maxDate);
    const stdDev = getStandardDev(data, minDate, maxDate, m, b);
    const norm = 1 - Math.sqrt(1 / (stdDev + 1));
    return (<div>
      <div className='date-range-title'>Current date range:</div>
      <div className='stock-stats-date-range'>{minDate.toISOString().split('T')[0]} to {maxDate.toISOString().split('T')[0]}</div>
      <div className='row'>

        <div className='col-sm-6'>
          <div className='bar-chart-title'>Volatility<InfoButton text={'The volatility of the share price over the time period on the chart. Calculated as a normalised standard deviation.'}/></div>
          <div className='row'>
            <div className='background-bar'>
              <div className='foreground-bar' style={{'backgroundColor':'white', 'height':200 - (200 * (1 - Math.sqrt(1 / (stdDev + 1))))}}>
              </div>
            </div>
          </div>
          <div className='stock-stat-value'>{(10 * (1 - Math.sqrt(1 / (stdDev + 1)))).toFixed(2)}</div>
          <div className='stock-stat-blurb'>Volatility Score</div>
        </div>

        <div className='col-sm-6'>
          <div className='bar-chart-title'>Growth Rate<InfoButton text={'The average rate of change of the share price over the time period on the chart. Calculated as the gradient of a linear regression.'}/></div>
          <div className='row'>
            <div className='positive-bar'>
              <div className='positive-foreground-bar' style={{'backgroundColor': 'white', 'height':this.getPositiveHeight(m) }}></div>
            </div>
            <div className='negative-bar'>

              <div className='negative-foreground-bar' style={{'backgroundColor': '#d9534f', 'height':this.getNegativeHeight(m), 'borderBottomLeftRadius': 4, 'borderBottomRightRadius': 4}}></div>
            </div>
          </div>
          <div className='stock-stat-value'>$ {m.toFixed(2) || 0}</div>
          <div className='stock-stat-blurb'>Growth per share per day</div>
        </div>

      </div>
    </div>);
  }
}
