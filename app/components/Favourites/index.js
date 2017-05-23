import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import EmptyState from 'components/EmptyState';
import CompanyListItem from 'components/Favourites/listItem';
import { getCmp } from 'utils/lookup';


export default class FavouriteCompanies extends React.Component {

  render() {
    const { companies, unfollow } = this.props;
    const list = companies.map((c, i) =>
      <div className='row' key={i}>
        <div className='col-sm-11'>
          <Link to={`/company/${c}`}>
            <CompanyListItem title={getCmp(c)} content={''} key={i}/>
          </Link>
        </div>
        <div className='col-sm-1'>
          {/* need logic to remove */}
          <button
            type='button'
            className='btn btn-danger remove-button'
            onClick={unfollow(c)}
            >
            <span className='glyphicon glyphicon-remove'></span>
          </button>
        </div>
      </div>
    );
    return(
      <div>
        <div className='page-title preferences-title'> Preferences </div>
        <Link to='/discover'>
          <button type='button' className='btn btn-success add-company'>
            <span className='glyphicon glyphicon-plus'></span> Add a company
          </button>
        </Link>
        {companies.length === 0 ? <EmptyState /> : list}
      </div>
    );
  }
}
