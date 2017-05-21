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
  }

  render(){
    const { token, profile } = this.props;
    if (token) {
        return (
          <div className='user-icon-container'>
            <img src={profile['picture']} className='user-icon'/>
            <div className='user-detail'>
              { profile['nickname'] }<br/>
              <a href='#0'  onClick={this.logout.bind(this)} className='login logout'>click to logout</a>
            </div>
          </div>
        );
    }
    return (
      <div>
        <img src='static/images/jess.svg' className='user-icon'/>
        <div className='user-detail'>
          Not logged in yet<br/>
          <a href='#'  onClick={this.login.bind(this)} className='login logout'>click to login</a>
        </div>
      </div>
    )
  }
}
