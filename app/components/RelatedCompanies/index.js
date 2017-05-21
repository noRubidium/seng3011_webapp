import React from 'react';
import { Link } from 'react-router-dom';

import { getCmp } from 'utils/lookup';
import CompanyListItem from 'components/RelatedCompanies/listItem'

export default class RelatedCompanies extends React.Component {
  render() {
    const { companies } = this.props;
    const list = companies.map((c, i) =>
      <Link to={`/company/${c}`}  key={i}>
        <CompanyListItem title={getCmp(c)} content={''}/>
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
