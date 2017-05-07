import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats, load_abs_stats } from 'actions/company';
import StockChart from 'components/util/index.js';

@connect((store) => {
  return {
    ...store.company.company_stats,
    info: store.company.company_info,
  };
})
export default class CompanyInfo extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    this.state = {
      abs_started: false
    };
  }
  render () {
    if (!this.state.abs_started && !this.props.info.loading) {
      this.setState({abs_started: true});
      const { dispatch, company_id } = this.props;
      load_company_stats(company_id, dispatch);
      load_abs_stats('HouseholdGood', dispatch);
    }
    if (this.props.absData && this.props.financeData) {
      this.loaded_object = (<div>
        <StockChart absData={this.props.absData} financeData={this.props.financeData}/>
        </div>);
    }
    return super.render();
  }
}
