import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_company_news } from 'actions/company';

@connect((store) => {
  return store.company.company_news;
})
export default class CompanyNews extends LoadableComponent {

  constructor (props) {
    super(props);
    console.log(this);
    const { cid, dispatch } = this.props;
    load_company_news(cid, dispatch);
  }
  render () {
    this.loaded_object = (<div>
      company:{this.props.company_id}
    </div>);
    return super.render();
  }
}
