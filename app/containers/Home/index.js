import React from 'react';
import { Link } from 'react-router-dom';

import HomeInfo from 'components/Home/info';
import HomeContent from 'components/Home/content';

export default class Home extends React.Component {
  render () {
    return (
      <div className='front-page'>
        <div className='stockoverflow'> StockOverflow </div>
        <div className='search-by-company'>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='Search for a company'/>
            <span className='input-group-btn'>
              <button className='btn btn-default' type='button'>Go!</button>
            </span>
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
