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

  load_compare_stats() {
    
  }

  componentWillMount() {
    const { loading } = this.props;
    if (!loading) {
      this.load_compare_stats();
    }
  }

  componentDidUpdate() {
    const { loading, dispatch, cid } = this.props;
    if (!loading) {
      load_company_stats(cid, dispatch);
    }
  }

  render () {
    const { loaded, company_name } = this.props;
    const categories = ['Food'];

    if (loaded) {
      this.loaded_object = (<div>
          {/*<StockChart financeData={this.props.financeData}
          company_name={company_name} currentCategoryIndex={0}
          categories={categories}/>*/}
          Here is the chart
        </div>);
    }
    return super.render();
  }
}
