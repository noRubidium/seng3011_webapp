import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_abs_stats } from 'actions/company_list';
import GenericChart from 'components/GenericChart';


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

  beautifyData (data) {
    const dataUsed = data.MonthlyRetailData || data.MonthlyCommodityExportData;
    const type = data.MonthlyRetailData ? 'turnover' : 'value';
    const init = dataUsed[0].regional_data;
    const b = init.map((e) => {
      const vs = e.data.map((d) => {
        return {date: d.date, value:d[type]};
      });
      return {label: e.state, values: vs};
    })

    return b;
  }
  render () {
    const { loaded, data, industry } = this.props;

    if (loaded) {
      const yText = data.MonthlyRetailData ? 'Retail Turnover (million AUD)' :
                              'Merchandise Exports (thousands AUD)';
      //
      // const categories = data.MonthlyRetailData.map((e) => e.category);
      // const { currentCategoryIndex } = this.state;
      // const currentCategory = industry.split(/(?=[A-Z])/).join(' ');
      this.loaded_object = (<GenericChart data={this.beautifyData(data)} yText={yText}/>);
    }
    return super.render();
  }
}
