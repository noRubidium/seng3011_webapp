import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats } from 'actions/company/stats';
import StockChart from 'components/StockChart';

@connect((store) => {
  return store.company.company_stats;
})
export default class CompanyInfo extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
  }

  componentWillReceiveProps (nextProp) {
    if (!loaded) {
      const { dispatch, cid } = this.props;
      load_company_stats(cid, dispatch);
    }
  }

  render () {
    const { loaded } = this.props;
    if (loaded) {
      this.loaded_object = (<div>
          <StockChart financeData={this.props.financeData}
          company_name={this.props.info.name} currentCategoryIndex={this.state.currentCategoryIndex}
          categories={categories}/>
        </div>);
    }
    return super.render();
  }
}
