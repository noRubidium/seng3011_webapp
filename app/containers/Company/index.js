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
    return (
      <div>
        <div>
          <CompanyInfo />
          <CompanyPrice />
        </div>
        <section className='row'>
          <div className='col-6 col-sm-4 placeholder'> {/*need styling */}
            <CompanyNews />
          </div>
          <div className='col-6 col-sm-8 placeholder'>
            <CompanyStats />
          </div>
        </section>
      </div>
    );
  }
}
