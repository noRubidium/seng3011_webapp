import React from 'react';
import { Link } from 'react-router-dom';

import HomeInfo from 'components/Home/info';
import HomeContent from 'components/Home/content';
import SearchBar from 'components/SearchBar';

export default class Home extends React.Component {
  render () {
    return (
      <div className='front-page'>
        <div className='stockoverflow'> StockOverflow </div>
        <div className='search-by-company'>
          <div className='input-group'>
            <SearchBar />
          </div>
        </div>
        <div className='search-industries'>
          Don''t know what to find?&nbsp;
          <Link to='/industries'>Click to search on industries</Link>
        </div>
      </div>
    );
  }
}
