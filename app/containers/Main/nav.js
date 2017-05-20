import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

class Header extends React.Component {
  // TODO: search stuff here
  render() {
    return(
      <header className='header'>
    		<div className='logo'>
    			<a href='#0'>
    				<img src='static/images/logo.svg' className='logo-icon'/>StockOverflow
    			</a>
    		</div>
    		<div className='search-bar'>
    			<form action='#0'>
    				<input type='search' placeholder='Search...'/>
    				<a href='#0'><img src='static/images/search.svg' className='search-icon'/></a>
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
    const sideLinks = links.map(link =>
      <li className={link + '-sidebar ' + (this.state.active === link ? 'active' : '')}>
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
					<img src='static/images/jess.svg' className='user-icon'/>
					<div className='user-detail'>
						Jessica Theodosius<br/>
						<a href='#0' className='login logout'>click to logout</a>
					</div>
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
