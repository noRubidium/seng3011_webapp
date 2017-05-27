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
      const url = `${process.env.API_URL}/mapping/rel/${company_id.slice(0,3)}`
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

  loadIndustries () {
    const { company_id } = this.props.match.params;
    if (this.state.curr_cmp !== company_id) {
      this.setState({started: false, curr_cmp: company_id});
      const url = `${process.env.API_URL}/mapping/cmp/${company_id.slice(0,3)}`
      fetch(url)
        .then((response) => {
          if (!response.ok) return;
          return response.json();
        })
        .then((data) => {
          if (this.state.curr_cmp === company_id) {
            this.setState({ industries: data.industries });
          }
        });
    }
  }

  componentWillMount () {
    this.loadRelated();
    this.loadIndustries();
  }

  componentDidUpdate () {
    this.loadRelated();
    this.loadIndustries();
  }

  render () {
    const { company_id } = this.props.match.params;
    return (
      <div>
        <div className='row'>
          <div className='col-sm-8 white-bg-container'>
            <CompanyInfo cid={company_id}
                         related_companies={this.state.related_companies}
                         industries={this.state.industries}/>
            <div className='white-bg'>
              <div className='sub-title'> Stock Price Information & Fundamentals
                <InfoButton text={'These are the key statistics to understanding the fundamental condition of the company. Click on each individual statistic to find out more.'}/>
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
                <InfoButton text={'This chart visualises the historical share price of the stock. It is also populated with news items related to the company. Use this to find trends and the impacts of news events on the stock price.'}/>
              </div>
              <CompanyStats cid={company_id} company_name={getCmp(company_id)}/>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 white-bg-container'>
            <div className='white-bg'>
              <div className='sub-title'> Latest News
                <InfoButton text={'The latest news relating to this company. News can inform investors of potential opportunities to buy or sell to make a profit. It can also be used as an educational tool to understand the market better.'}/>
              </div>
              <CompanyNews cid={company_id}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
