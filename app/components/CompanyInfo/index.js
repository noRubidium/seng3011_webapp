import React from 'react';
import { connect } from 'react-redux';
import StockChart from 'components/util/index.js';

import LoadableComponent from 'components/LoadableComponent';

@connect((store) => {
  return store.company.company_info;
})
export default class CompanyInfo extends LoadableComponent {

  render () {
    this.loaded_object = (<div>
      company:{this.props.company_id}
      <StockChart />
    </div>);
    return super.render();
  }
}
