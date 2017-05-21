import React from 'react';

import CompanyInfo from 'components/CompanyInfo';
import CompanyNews from 'components/CompanyNews';
import CompanyStats from 'components/CompanyStats';
import CompanyPrice from 'components/CompanyPrice';
import IndustryChart from 'components/industry/chart';

import RelatedCompanies from 'components/RelatedCompanies';
import { getCmp } from 'utils/lookup';

const relatedcompanies = [
  {
    'company': 'MYR - Myer',
    'instrumentId': 'MYR.AX'
  },
  {
    'company': 'HVN - Harvey Norman',
    'instrumentId': 'HVN.AX'
  },
  {
    'company': 'WES - Wesfarmers',
    'instrumentId': 'WES.AX'
  }
]

export default class Company extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { company_id } = this.props.match.params;
    return (
      <div>
        <div className='row'>
          <div className='col-sm-8'>
            <CompanyInfo cid={company_id}/>
            <CompanyPrice cid={company_id}/>
            <div className='col-sm-12'>
              <div className='sub-title'> Stock Graph </div>
              <CompanyStats cid={company_id} company_name={getCmp(company_id)}/>
            </div>
            {/*NEWS*/}
          </div>
          <div className='col-sm-4'>
            <RelatedCompanies companies={relatedcompanies}/>
          </div>
        </div>
      </div>
    );
  }
}
