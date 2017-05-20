import React from 'react';
import { Link } from 'react-router-dom';

import CompanyListItem from 'components/Favourites/listItem'

export default class FavouriteCompanies extends React.Component {
  render() {
    const { companies } = this.props;
    const list = companies.map((c) =>
      <div className='row'>
        <div className='col-sm-11'>
          <Link to={`/company/${c.instrumentId}`}>
            <CompanyListItem title={c.company} content={''}/>
          </Link>
        </div>
        <div className='col-sm-1'>
          {/* need logic to remove */}
          <button type='button' className='btn btn-danger remove-button'>
            <span className='glyphicon glyphicon-remove'></span>
          </button>
        </div>
      </div>
    );
    return(
      <div>
        <div className='title preferences-title'> Preferences </div>
        <Link to='/discover'>
          <button type='button' className='btn btn-success add-company'>
            <span className='glyphicon glyphicon-plus'></span> Add a company
          </button>
        </Link>
        {list}
      </div>
    );
  }
}
