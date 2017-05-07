import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import HomeContentTile from './contentTile';
import { load_companies } from 'actions/home';


@connect((store) => {
  return store.home.companies;
})
export default class HomeContent extends LoadableComponent {

  constructor (props) {
    super(props);
    const { dispatch } = this.props;
    load_companies(dispatch);
  }

  render () {
    const { companies } = this.props;
    const companyList = companies.map((c) => <HomeContentTile company={c}/>)
    this.loaded_object = (<div>
      {companyList}
    </div>);
    return super.render();
  }
}
