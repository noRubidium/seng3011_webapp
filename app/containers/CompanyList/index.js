import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import CompanyListItem from 'components/CompanyListItem';
import { load_companies } from 'actions/company_list';
@connect((store) => {
  return {
    ...store.company_list,
  };
})
export default class NewsFeed extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    const { dispatch } = this.props;
    load_companies(dispatch, 'tmp');
  }

  render () {
    const loaded = true;

    if (loaded) {
      this.loaded_object = (<div> ${company_list.companies.map((cmp, i) => (<CompanyListItem company={cmp} key={i}/>))}</div>);
    }
    return super.render();
  }
}
