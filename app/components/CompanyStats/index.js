import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_info } from 'actions/company';


@connect((store) => {
  return store.company.company_stats;
})
export default class CompanyInfo extends LoadableComponent {

  constructor (props) {
    super(props);
    const { company_id, dispatch } = this.props;
    load_company_info(company_id, dispatch);
  }

  render () {
    this.loaded_object = (<div>
      company:{this.props.company_id}
    </div>);
    return super.render();
  }
}
