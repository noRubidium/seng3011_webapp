import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_stats } from 'actions/company/stats';
import GenericChart from 'components/GenericChart';

export default class CompareChart extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
  }

  render () {
    const { loaded, data, updateRange=(e)=>e, date=null } = this.props;
    if (loaded) {
      this.loaded_object = (<GenericChart data={data} date={date} updateRange={updateRange} yText='Company Return (%)'/>);
    }
    return super.render();
  }
}
