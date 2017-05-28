import React from 'react';
import { Link } from 'react-router-dom';

import { getCmp } from 'utils/lookup';
import CompanyListItem from './listItem';

export default class RelatedCompanies extends React.Component {
  render() {
    const { companies=[] } = this.props;
    const list = companies.map((c, i) => {
      if (!c) {
        return null;
      }

      if (c.indexOf('.AX') === -1) {
        c = `${c}.AX`;
      }

      return (
        <Link to={`/company/${c}`}  key={i}>
          <CompanyListItem title={getCmp(c)} content={''}/>
        </Link>
      );
    });
    const { onCompanyPage } = this.props;
    const moreThanThree = companies.length > 3;
    const className = onCompanyPage ? ('related-companies-list' + (moreThanThree ? ' pre-scrollable' : '')) : '';

    return(
      <div className='white-bg related-companies-div'>
        <div className='sub-title'> Related Companies </div>
          <div className={className}>
            {list}
          </div>
      </div>
    );
  }
}
