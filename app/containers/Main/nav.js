import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from 'components/Login';
import SearchBar from 'components/SearchBar';

class Header extends React.Component {
  render() {
    return(
      <header className='header'>
        <div className='logo'>
          <Link to='/'>
            <img src='static/images/logo.svg' className='logo-icon'/>
            StockOverflow
          </Link>
        </div>
      </header>
    )
  }
}


@connect((state) => {
  return state.user;
})
class SideBar extends React.Component {

  render() {
    const { path, token } = this.props;
    const active = path === '/feeds' ? 'feeds' : (path === '/preferences' ? 'preferences' : path === '/learning-centre' ? 'learning-centre' : 'discover');
    const base_links = [['discover', true], ['feeds', false], ['preferences', false], ['learning-centre', false]];
    const links = base_links.filter((e) => e[1] || token).map((e) => e[0]);
    const sideLinks = links.map((link, i) =>
      <li className={link + '-sidebar sidebar ' + (active === link ? 'active' : '')} key={i}>
        <Link to={`/${link}`}>
          <img src={`static/images/${link}.svg`}
          className={`icon`}/>{link.replace('-',' ')}
        </Link>
      </li>
    )

    return(
      <nav className='side-nav'>
        <ul>
          <li className='user'>
            <Login />
          </li>
          {sideLinks}
      </ul>
		</nav>
    )
  }
}

export default class Nav extends React.Component {
    render(){
        return(
            <div>
                <Header/>
                <SideBar path={this.props.path}/>
            </div>
        );
    }
}
