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
    this.state = {
      related_companies: []
    };
  }

  render () {
    const { company_id } = this.props.match.params;
    const url = `http://api.kaiworship.xyz/mapping/rel/${company_id.slice(0,3)}`
    fetch(url)
      .then((response) => {
        if (!response.ok) return;
        return response.json();
      })
      .then((data) => {
        this.setState({ related_companies: data.related_companies });
      });

    return (
      <div>
        <div className='row'>
          <div className='col-sm-8'>
            <CompanyInfo cid={company_id} related_companies={this.state.related_companies}/>
            <CompanyPrice cid={company_id}/>
            <div className='col-sm-12'>
              <div className='sub-title'> Stock Graph </div>
              <CompanyStats cid={company_id} company_name={getCmp(company_id)}/>
            </div>
            {/*NEWS*/}
          </div>
          <div className='col-sm-4'>
            <RelatedCompanies companies={this.state.related_companies}/>
          </div>
        </div>
      </div>
    );
  }
}
