import React from 'react';
import { connect } from 'react-redux';

import { login, logout } from 'actions/user/login';

@connect((store) => {
  return store.user;
})

export default class Login extends React.Component {
  login(e){
    e.preventDefault();
    const { lock } = this.props;
    this.props.dispatch(login(lock));
  }
  logout(e){
    e.preventDefault();
    this.props.dispatch(logout());
    // this.props.history.push('/')
  }
  render(){
    const { token, profile } = this.props;
    if (token) {
        return (
          <div>
            <div>Welcome, { profile['nickname'] }</div>
            <img src={profile['picture']} />
            <div><a href='#' onClick={this.logout.bind(this)}>LOGOUT</a></div>
          </div>
        );
    }
    return (
      <ul>
        <li><a href='#' onClick={this.login.bind(this)}>LOGIN</a></li>
      </ul>
    )
  }
}
