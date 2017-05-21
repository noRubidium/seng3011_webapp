import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats } from 'actions/company/stats';

import StockChartFlag from 'components/StockChart/flag.js';

@connect((store) => {
  return store.company.company_stats;
})
export default class CompanyInfo extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    this.state = {};
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
    const categories = ['Food'];
    console.log('HERE',this.props);
    if (loaded) {
      this.other_child = <CompanyStatistics {...this.state}/>;
      this.chart = <StockChartFlag financeData={this.props.financeData}
      company_name={company_name} newsData={this.props.newsData} updateRange={this.updateRange.bind(this)}/>;
      this.loaded_object = (<div>
        {this.chart}
        {this.other_child}
      </div>);
    }
    return super.render();
  }
}


class CompanyStatistics extends React.Component {
  render () {
    console.log("MIN/MAX",this.props);
    const { min, max } = this.props;
    return (<div>min: {min}, max: {max}</div>);
  }
}
