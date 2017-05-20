import React from 'react';
import { connect } from 'react-redux';

import FollowButton from 'components/FollowButton';
import CompareButton from 'components/CompareButton';
import LoadableComponent from 'components/LoadableComponent';
import { load_company_info } from 'actions/company/info';
import { load_company_price } from 'actions/company/price';


@connect((store) => {
  return store.company.company_info;
})
export default class CompanyInfo extends LoadableComponent {

  constructor (props) {
    super(props);
    const { cid, dispatch } = this.props;
    load_company_info(cid, dispatch);
  }



  render () {
    const { cid } = this.props;
    this.loaded_object = (
      <div>
        <div className='col-md-6'>
          <div className='company-title title'>{cid}</div>
        </div>
        <div className='col-md-6'>
          <div className='buttons'>
            <CompareButton/>
            <FollowButton cid={cid}/>
          </div>
        </div>
      </div>);
    return super.render();
  }
}
