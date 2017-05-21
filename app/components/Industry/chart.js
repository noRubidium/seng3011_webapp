import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_abs_stats } from 'actions/company_list';
import StockChart from 'components/StockChart';


@connect((store) => {
  return store.company_list.abs;
})
export default class IndustryChart extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    this.state = {
      abs_started: false,
      currentCategoryIndex: 0
    };
  }

  componentWillReceiveProps (nextProp) {
    if (nextProp.cid !== this.props.cid) {
      this.setState({abs_started: false});
    }
  }
  render () {
    const { loaded, data, industry } = this.props;
    if (loaded) {
      const categories = data.MonthlyRetailData.map((e) => e.category);
      const { currentCategoryIndex } = this.state;
      const currentCategory = industry.split(/(?=[A-Z])/).join(' ');
      this.loaded_object = (<div>
            <StockChart absData={data} financeData={[]} currentCategoryIndex={0}
            categories={categories}/>
        </div>);
    }
    return super.render();
  }
}
