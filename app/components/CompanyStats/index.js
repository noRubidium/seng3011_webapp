import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats, load_abs_stats } from 'actions/company';
import StockChart from 'components/StockChart';

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
      const { dispatch, cid } = this.props;
      load_company_stats(cid, dispatch);
      load_abs_stats(this.props.info.categories[0], dispatch);
    }
    if (this.props.absData && this.props.financeData) {
      this.loaded_object = (<div>
          <div className='charts-heading'>Charts</div>
          <div className='panel panel-default'>
            <div className='panel-body'>
            <StockChart absData={this.props.absData} financeData={this.props.financeData}
            company_name={this.props.info.name}
            categories={this.props.info.categories}/>
            </div>
          </div>
        </div>);
    }
    return super.render();
  }
}
