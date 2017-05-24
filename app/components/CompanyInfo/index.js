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
    const { cid, related_companies, industries } = this.props;
    const companies = data.data;
    const c = getCmp(cid);
    const industriesLabels = industries ? industries.map((i) =>
        <span className='label label-info industry-label'>
          <a href={`/#/industry/${i}`}>
            {i.replace(/([A-Z])/g, ' $1').trim()}
          </a>
        </span>) : '';
    return (
      <div className='white-bg' style={{overflow: 'auto'}}>
        <div className='company-name'>
          <div className='company-title title'>{c.toLowerCase()}</div>
        </div>
        <div className='buttons'>
          <FollowButton cid={cid}/>
          <CompareButton companies={companies} related_companies={related_companies} default_state={[cid]}/>
        </div>
        <div>
          <div className='sub-title company-code'>{cid}</div>
        </div>
        <div>
          {industriesLabels}
        </div>
      </div>);
  }
}
