import React from 'react';

import CompanyInfo from 'components/CompanyInfo';
import CompanyNews from 'components/CompanyNews';
import CompanyStats from 'components/CompanyStats';
import CompanyPrice from 'components/CompanyPrice';

export default class Company extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { company_id } = this.props.match.params;
    return (
      <div style={{background:'white',
      WebkitTransition: 'height 2s',
      transition: 'height 2s'}}>
        <div>
          <CompanyInfo cid={company_id}/>
        </div>
        <section className='row'>
          <div className='col-6 col-sm-4 placeholder'> {/*need styling */}
            <CompanyNews cid={company_id}/>
          </div>
          <div className='col-6 col-sm-8 placeholder' style={{minHeight: '500px'}}>
            <CompanyStats cid={company_id}/>
          </div>
        </section>
      </div>
    );
  }
}
