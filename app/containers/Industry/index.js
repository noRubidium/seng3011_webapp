import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import RelatedCompanies from 'components/RelatedCompanies';
import IndustryInfo from 'components/Industry/info';
import IndustryStatistics from 'components/Industry/stats';
import IndustryChart from 'components/Industry/chart';
import { load_companies, load_abs_stats } from 'actions/company_list';


const data = {
  'category': 'Department Store',
  'details': 'Consists of units engaged in retailing a wide variety of goods, other than food or groceries. Including clothing, furniture, kitchenware, textile goods, electronic appliances, perfumes.',
  'stats': {
    'sd': 2.13,
    'trend': 'increase'
  },
  'relatedcompanies': [
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
}

@connect((store) => {
  return {
    ...store.company_list,
  };
})
export default class Industries extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    const { dispatch } = this.props;
    const industry = this.props.match.params.industry_name;
    load_companies(dispatch, industry);
    load_abs_stats(dispatch, industry);
  }

  render () {
    const { loaded, companies, abs, industry:category } = this.props;
    const industry = data;

    if (loaded) {
      this.loaded_object = (
        <div>
          <div className='row'>
            <div className='col-sm-8'>
              <IndustryInfo title={category} details={industry.details}/>
              <IndustryChart industry={category}/>
            </div>
            <div className='col-sm-4'>
              <RelatedCompanies companies={industry.relatedcompanies}/>
            </div>
          </div>
        </div>
      );
    }
    return this.loaded_object;
  }
}
