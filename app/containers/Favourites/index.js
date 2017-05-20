import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import FavouriteCompanies from 'components/Favourites';
import LoadableComponent from 'components/LoadableComponent';

const companies = [
  {
    'company': 'MYR - Myer',
    'instrumentId': 'MYR.AX'
  },
  {
    'company': 'HVN - Harvey Norman',
    'instrumentId': 'HVN.AX'
  },
  {
    'company': 'WES - Wesfarmers',
    'instrumentId': 'WES.AX'
  },
  {
    'company': 'KGN - Kogan',
    'instrumentId': 'KGN.AX'
  },
  {
    'company': 'WOW - Woolworths',
    'instrumentId': 'WOW.AX'
  }
]

@connect((store) => {
  return {
    ...store.user,
  };
})
export default class News extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
  }

  render () {
    const loaded = this.props;
    const following = companies;

    if (loaded) {
      this.loaded_object = (
        <div>
          <FavouriteCompanies companies={following}/>
        </div>
      );
    }
    return this.loaded_object;
  }
}
