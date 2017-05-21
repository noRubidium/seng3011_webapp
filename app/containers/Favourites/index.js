import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import FavouriteCompanies from 'components/Favourites';
import LoadableComponent from 'components/LoadableComponent';
import { unfollow } from 'actions/user/follow';

@connect((store) => {
  return store.user;
})
export default class News extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
  }

  unfollow (cid) {
    return () => this.props.dispatch(unfollow(cid));
  }

  render () {
    // const loaded = true;
    const { following } = this.props;

    return (
      <div>
        <FavouriteCompanies companies={following} unfollow={this.unfollow.bind(this)}/>
      </div>
    );
  }
}
