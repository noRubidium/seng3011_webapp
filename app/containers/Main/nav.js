import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from 'components/Login';
import SearchBar from 'components/SearchBar';

@connect((store) => {
  return store.user;
})
class Header extends React.Component {
  render() {
    console.log('prop',this.props);

    const { following } = this.props;

    const ticker = following.map((c) => {
      return (<li><a href="#">{c}</a></li>)
    });

    return(
      <header className='header'>
        <div className='logo'>
          <Link to='/'>
            <img src='static/images/logo.svg' className='logo-icon'/>
            StockOverflow
          </Link>
        </div>
        <div className="stock-ticker float-right">
        	<span>Latest News</span>
        	<ul>
        		{ticker}
        	</ul>
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
    const active = path === '/feeds' ? 'feeds' : (path === '/preferences' ? 'preferences' : path.match('^/learning-centre') ? 'learning-centre' : path === '/industries' ? 'industries' :'discover');
    const base_links = [['discover', true], ['industries', true], ['feeds', false], ['preferences', false], ['learning-centre', false]];
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
