import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats, load_abs_stats } from 'actions/company/stats';
import StockChart from 'components/StockChart';


class CategoryDropdown extends React.Component {
  render() {
    const { categories, changeCategoryIndex } = this.props;
    const categoriesItems = categories.map((c, index) =>
      <li><a href='#' onClick={(e) => changeCategoryIndex(e, index)} key={index}>
        {c.split(/(?=[A-Z])/).join(' ')}
      </a></li>);

    return (<div className='dropdown category-dropdown'>
      <button className='btn btn-default dropdown-toggle' type='button' data-toggle='dropdown'>
        Change category <span className='caret'></span>
      </button>
      <ul className='dropdown-menu'>
        {categoriesItems}
      </ul>
    </div>)
  }
}

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

  changeCategoryIndex(e, index) {
    e.preventDefault();
    console.log(index);
    this.setState({currentCategoryIndex: index});
  }

  render () {
    const { categories } = this.props.info;

    if (!this.state.abs_started && !this.props.info.loading) {
      this.setState({abs_started: true});
      const { dispatch, cid } = this.props;
      load_company_stats(cid, dispatch);
      load_abs_stats(categories, dispatch);
    }

    if (this.props.absData && this.props.financeData) {
      const { currentCategoryIndex } = this.state;
      const currentCategory = categories[currentCategoryIndex].split(/(?=[A-Z])/).join(' ');

      this.loaded_object = (<div>
        <div className='charts-heading'>Charts</div>
          <div className='panel panel-default'>
            <div className='category-selection'>
              <CategoryDropdown categories={categories}
                changeCategoryIndex={this.changeCategoryIndex}/>
              <span className='selected-category'>
                Selected Category: <u>{currentCategory}</u>
              </span>
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
