import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats } from 'actions/company/stats';
import { getStandardDev, getMean } from 'utils/statsUtil';

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
      this.loaded_object = (<div>
        {this.chart}
        {this.other_child}
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
    console.log('DATES: ', min, max, minDate, maxDate);

    return (<div>
      Current date range: {minDate.toISOString().split('T')[0]} - {maxDate.toISOString().split('T')[0]}
      <p>standard Dev: {getStandardDev(data, minDate, maxDate)}</p>
    </div>);
  }
}
