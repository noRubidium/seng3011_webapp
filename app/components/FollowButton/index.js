import React from 'react';
import { connect } from 'react-redux';

import { follow, unfollow } from 'actions/user/follow';


@connect((store) => {
  return store.user;
})
export default class FollowButton extends React.Component {

  follow() {
    this.props.dispatch(follow(this.props.cid));
  }

  unfollow() {
    this.props.dispatch(unfollow(this.props.cid));
  }

  render () {
    const { following, cid, token } = this.props;
    if (!token) return null;
    const followed = following.includes(cid);
    const handle = followed ? this.unfollow.bind(this) : this.follow.bind(this);
    const text = followed ? 'Unfollow': 'Follow';
    const color = followed ? 'btn-danger': 'btn-success';
    const follow_button = (
      <button onClick={handle} href='#' className={`btn ${color} follow-button`}>{ text }</button>
    )
    return follow_button;
  }
}
