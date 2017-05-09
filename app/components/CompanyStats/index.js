import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats, load_abs_stats } from 'actions/company/stats';
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
      abs_started: false,
      currentCategoryIndex: 0
    };
    this.changeCategoryIndex = this.changeCategoryIndex.bind(this);
  }

  changeCategoryIndex(index) {
    this.setState({currentCategoryIndex: index});
  }

  render () {
    const { categories } = this.props.info;

    if (!this.state.abs_started && !this.props.info.loading) {
      this.setState({abs_started: true});
      const { dispatch, cid } = this.props;
      load_company_stats(cid, dispatch);
      load_abs_stats(this.props.info.categories, dispatch);
    }

    if (this.props.absData && this.props.financeData) {
      const tabs = categories.map((c, index) => <li><a href='#' onClick={this.changeCategoryIndex(index)}>{c}</a></li>);

      this.loaded_object = (<div>
          <div className='charts-heading'>Charts</div>
          <div className='panel panel-default'>
          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Category
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              {tabs}
            </ul>
          </div>
            <div className='panel-body'>
            <StockChart absData={this.props.absData} financeData={this.props.financeData}
            company_name={this.props.info.name} currentCategoryIndex={this.state.currentCategoryIndex}
            categories={categories}/>
            </div>
          </div>
        </div>);
    }
    return super.render();
  }
}
