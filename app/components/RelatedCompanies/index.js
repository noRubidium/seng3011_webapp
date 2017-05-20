import React from 'react';
import { Link } from 'react-router-dom';

import CompanyListItem from 'components/RelatedCompanies/listItem'

export default class RelatedCompanies extends React.Component {
  render() {
    const { companies } = this.props;
    const list = companies.map(c =>
      <Link to={`/company/${c.instrumentId}`}>
        <CompanyListItem title={c.company} content={''}/>
      </Link>
    );
    return(
      <div>
        <div className='sub-title'> Related Companies </div>
        {list}
      </div>
    );
  }
}
