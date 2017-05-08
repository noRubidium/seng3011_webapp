import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Home from 'containers/Home';
import Stats from 'containers/Stats';
import Company from 'containers/Company';

export default class Main extends React.Component {
    render(){
        return(
            <div>
                {<nav className="navbar navbar-default" id="navbar-eleven51">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to='/'>ELEVEN51</Link>
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
                    <Route path="/stats" component={Stats}/>
                    <Route path="/company/:company_id" component={Company}/>
                    <Route exact path="/" component={Home} />
                  </Switch>
                </div>
            </div>
        );
    }
}
