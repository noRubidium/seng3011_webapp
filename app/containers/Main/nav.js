import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

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
        <div className='search-bar'>
          <form action='#/'>
            <input type='search' placeholder='Search for the company'/><a href='#/'>
              <img src='static/images/search.svg' className='search-icon'/>
            </a>
          </form>
        </div>
      </header>
    )
  }
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'discover'
    };
    this.changeActiveLink = this.changeActiveLink.bind(this);
  }

  changeActiveLink(active) {
    this.setState({ active });
  }

  render() {
    const links = ['discover', 'feeds', 'preferences'];
    const sideLinks = links.map((link, i) =>
      <li className={link + '-sidebar ' + (this.state.active === link ? 'active' : '')} key={i}>
        <Link to={`/${link}`} onClick={() => this.changeActiveLink(link)}>
          <img src={`static/images/${link}.svg`}
          className={`${link}-icon`}/>{link}
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
                <SideBar/>
            </div>
        );
    }
}
