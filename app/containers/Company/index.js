import React from 'react';

import CompanyInfo from 'components/CompanyInfo';
import CompanyNews from 'components/CompanyNews';
import CompanyStats from 'components/CompanyStats';
import CompanyPrice from 'components/CompanyPrice';

import RelatedCompanies from 'components/RelatedCompanies';
import { getCmp } from 'utils/lookup';
import InfoButton from 'components/InfoButton';


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
          <div className='col-sm-8 white-bg-container'>
            <CompanyInfo cid={company_id} related_companies={this.state.related_companies}/>
            <div className='white-bg'>
              <div className='sub-title'> Stock Price Information
                <InfoButton text={'Clinton please change this!'}/>
              </div>
              <CompanyPrice cid={company_id}/>
            </div>
          </div>
          <div className='col-sm-4 white-bg-container'>
            <RelatedCompanies companies={this.state.related_companies}
                              onCompanyPage={true}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 white-bg-container'>
            <div className='white-bg'>
              <div className='sub-title'> Stock Graph
                <InfoButton text={'Clinton please change this!'}/>
              </div>
              <CompanyStats cid={company_id} company_name={getCmp(company_id)}/>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 white-bg-container'>
            <div className='white-bg'>
              <div className='sub-title'> Latest News
                <InfoButton text={'Clinton please change this!'}/>
              </div>
              <CompanyNews cid={company_id}/>
            </div>
<<<<<<< HEAD
          </div>
          <div className='col-sm-4 white-bg-container'>
            <RelatedCompanies companies={this.state.related_companies}
                              onCompanyPage={true}/>
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
=======
>>>>>>> f0486c0f721a3fa4aed94c0139e0938c8a54cb97
          </div>
        </div>
      </div>
    );
  }
}
