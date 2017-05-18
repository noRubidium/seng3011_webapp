import React from 'react';

import CompanyListItem from 'components/CompanyListItem';

export default class Company extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { company_id } = this.props.match.params;
    return (
      <div className='company-container'>
        <div className='row'>
          <CompanyInfo cid={company_id}/>
        </div>
        <div className='row company-price-section'>
          <CompanyPrice cid={company_id}/>
        </div>
        <section className='row'>
          <div className='col-md-4 col-sm-12 placeholder'> {/*need styling */}
            <CompanyNews cid={company_id}/>
          </div>
          <div className='col-md-8 col-sm-12 placeholder' style={{minHeight: '500px'}}>
            <CompanyStats cid={company_id}/>
          </div>
        </section>
      </div>
    );
  }
}
