import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';

@connect((store) => {
  return store.company.company_news;
})
export default class CompanyInfo extends LoadableComponent {

  render () {
    this.loaded_object = (<div>
      company:{this.props.company_id}
    </div>);
    return super.render();
  }
}
