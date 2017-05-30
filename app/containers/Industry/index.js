import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import RelatedCompanies from 'components/RelatedCompanies';
import IndustryInfo from 'components/Industry/info';
import IndustryStatistics from 'components/Industry/stats';
import IndustryChart from 'components/Industry/chart';
import { load_companies, load_abs_stats } from 'actions/company_list';
import { getCmp, getType } from 'utils/lookup';
import industries from 'components/Industry/data';
import InfoButton from 'components/InfoButton';


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
    load_abs_stats(dispatch, industry, getType(industry));
  }

  render () {
    const { loaded, companies, abs, industry:category } = this.props;

    if (loaded) {
      const industry = industries.filter((i) => i.id === category)[0];
      const related_companies = companies.map((e) => {
        return {
          instrumentId: `${e}.AX`,
          company: getCmp(e),
        };
      })
      const type = getType(category);

      this.loaded_object = (
        <div>
          <div className='row'>
            <div className='col-sm-8 white-bg-container'>
              <IndustryInfo title={industry.title} details={industry.content} type={type}/>
              <div className='white-bg'>
                <div className='sub-title'>Industry Chart
                  <InfoButton text={'This chart visualises the historical turnover for the current industry.'}/>
                </div>
                  <IndustryChart industry={category}/>
                {/*<IndustryStatistics stats={industry.stats}/>*/}
              </div>
            </div>
            <div className='col-sm-4 white-bg-container'>
              <RelatedCompanies companies={related_companies.map((e) => e.instrumentId)}/>
            </div>
          </div>
        </div>
      );
    }
    return this.loaded_object;
  }
}
