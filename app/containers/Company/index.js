import React from 'react';

import CompanyInfo from 'components/CompanyInfo';
import CompanyNews from 'components/CompanyNews';
import CompanyStats from 'components/CompanyStats';
import CompanyPrice from 'components/CompanyPrice';

import RelatedCompanies from 'components/RelatedCompanies';
import { getCmp } from 'utils/lookup';



export default class Company extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      started: false,
      curr_cmp: '',
      related_companies: [],
    };
  }

  loadRelated () {
    const { company_id } = this.props.match.params;
    if (this.state.curr_cmp !== company_id) {
      this.setState({started: true, curr_cmp: company_id});
      const url = `http://api.kaiworship.xyz/mapping/rel/${company_id.slice(0,3)}`
      fetch(url)
        .then((response) => {
          if (!response.ok) return;
          return response.json();
        })
        .then((data) => {
          if (this.state.curr_cmp === company_id) {
            this.setState({ related_companies: data.related_companies });
          }
        });
    }
  }

  componentWillMount () {
    this.loadRelated();
  }

  componentDidUpdate () {
    this.loadRelated();
  }

  render () {
    const { company_id } = this.props.match.params;

    return (
      <div>
        <div className='row'>
          <div className='col-sm-8'>
            <CompanyInfo cid={company_id} related_companies={this.state.related_companies}/>
            <CompanyPrice cid={company_id}/>
          </div>
          <div className='col-sm-4'>
            <RelatedCompanies companies={this.state.related_companies}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='sub-title'> Stock Graph </div>
            <CompanyStats cid={company_id} company_name={getCmp(company_id)}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='sub-title latest-news-title'> Latest News </div>
            <CompanyNews cid={company_id}/>
          </div>
        </div>
      </div>
    );
  }
}
