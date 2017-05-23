import React from 'react';
import { connect } from 'react-redux';

import data from 'components/SearchBar/data.json';
import FollowButton from 'components/FollowButton';
import CompareButton from 'components/CompareButton';
import { load_company_info } from 'actions/company/info';
import { load_company_price } from 'actions/company/price';
import { getCmp } from 'utils/lookup';


export default class CompanyInfo extends React.Component {

  render () {
    const { cid, related_companies } = this.props;
    const companies = data.data;
    const c = getCmp(cid);
    return (
      <div>
          <div className='col-md-7 company-name no-left-padding'>
            <div className='company-title title'>{c.toLowerCase()}</div>
          </div>
          <div className='col-md-5 buttons no-right-padding'>
            <CompareButton companies={companies} related_companies={related_companies} default_state={[cid]}/>
            <FollowButton cid={cid}/>
          </div>
          <div className='col-md-12 no-padding'>
            <div className='sub-title company-code'>{cid}</div>
          </div>
      </div>);
  }
}
