import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Home from 'containers/Home';
import Company from 'containers/Company';
import CompanyList from 'containers/CompanyList';
import Industries from 'containers/Industries';
import Compare from 'containers/Compare';
import News from 'containers/News';
import NewsFeed from 'containers/NewsFeed';

export default class Main extends React.Component {
    render(){
        return(
            <div>
                {<nav className="navbar navbar-default" id="navbar-eleven51">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to='/'>RAP</Link>
                        </div>
                        {/*}<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className={this.props.location && this.props.location.pathname == '/stats'?'active':''}>
                                <Link to='/stats'>STATS</Link>
                                </li>
                                <li className={this.props.location && this.props.location.pathname == '/company'?'active':''}>
                                <Link to='/company'>COMPANY</Link>
                                </li>
                            </ul>
                        </div>*/}
                    </div>
                </nav>}
                <div className="container layout">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/industries" component={Industries}/>
                    <Route path="/industry/:industry_name" component={CompanyList}/>
                    <Route path="/company/:company_id" component={Company}/>
                    <Route path="/user/:uid" component={NewsFeed}/>
                    <Route path="/news/:news_url" component={News}/>
                    <Route path="/compare/:company_ids" component={Compare} />
                  </Switch>
                </div>
            </div>
        );
    }
}
