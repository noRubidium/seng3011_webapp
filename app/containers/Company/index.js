import React from 'react';

import CompanyInfo from 'components/CompanyInfo';
import CompanyNews from 'components/CompanyNews';
import CompanyStats from 'components/CompanyStats';

export default class Company extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { company_id } = this.props.match.params;
    return (
      <div>
        <div>
          <CompanyInfo cid={company_id}/>
        </div>
        <section className='row'>
          <div className='col-6 col-sm-4 placeholder'> {/*need styling */}
            <CompanyNews cid={company_id}/>
          </div>
          <div className='col-6 col-sm-8 placeholder'>
            <CompanyStats cid={company_id}/>
          </div>
        </section>
      </div>
    );
  }
}
