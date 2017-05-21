import React from 'react';
import { connect } from 'react-redux';

import FollowButton from 'components/FollowButton';
import CompareButton from 'components/CompareButton';
import { load_company_info } from 'actions/company/info';
import { load_company_price } from 'actions/company/price';
import { getCmp } from 'utils/lookup';


export default class CompanyInfo extends React.Component {

  render () {
    const { cid } = this.props;
    const c = getCmp(cid);
    return (
      <div>
          <div className='col-md-7 company-name'>
            <div className='company-title title'>{c.toLowerCase()}</div>
          </div>
          <div className='col-md-5 buttons'>
            <CompareButton/>
            <FollowButton cid={cid}/>
          </div>
          <div className='col-md-12'>
            <div className='sub-title company-code'>{cid}</div>
          </div>
      </div>);
  }
}
