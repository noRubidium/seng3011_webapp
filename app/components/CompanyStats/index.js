import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats } from 'actions/company/stats';
import { getStandardDev, getMean, findTrend } from 'utils/statsUtil';

import StockChartFlag from 'components/StockChart/flag.js';



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
        <div className='col-sm-8'>
          {this.chart}
        </div>
        <div className='col-sm-4'>
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
  render () {
    const { min, max, data } = this.props;
    const minDate = new Date(min);
    const maxDate = new Date(max);
    const [m, b] = findTrend(data, minDate, maxDate);
    const stdDev = getStandardDev(data, minDate, maxDate);
    return (<div>
      <p>Current date range:</p>
      <p className='stock-stats-date-range'>{minDate.toISOString().split('T')[0]} - {maxDate.toISOString().split('T')[0]}</p>
      <div className='row'>
        <div className='col-md-6'>
          <div className='background-bar'>
            <div className='foreground-bar' style={{'background-color':'red','height':toString((100 * (1 - Math.sqrt(1 / (stdDev + 1)))).toFixed(2)) + '%'}}>

            </div>
          </div>
          <p>Volatility Score: {(10 * (1 - Math.sqrt(1 / (stdDev + 1)))).toFixed(2)}</p>
        </div>
        <div className='col-md-6'>
        <p>Growth Rate: $ {m.toFixed(2) || 0} per share everyday </p>
        </div>
      </div>
    </div>);
  }
}
