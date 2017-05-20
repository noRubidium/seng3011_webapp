import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Nav from 'containers/Main/nav';
import Home from 'containers/Home';
import Company from 'containers/Company';
import CompanyList from 'containers/CompanyList';
import Favourites from 'containers/Favourites';
import Industries from 'containers/Industries';
import Compare from 'containers/Compare';
import News from 'containers/News';
import NewsFeed from 'containers/NewsFeed';

export default class Main extends React.Component {
    render(){
        return(
            <div>
                <Nav/>
                <div className='content'>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/discover' component={Home} />
                    <Route path='/industries' component={Industries}/>
                    <Route path='/industry/:industry_name' component={CompanyList}/>
                    <Route path='/company/:company_id' component={Company}/>
                    <Route path='/feeds' component={NewsFeed}/>
                    <Route path='/preferences' component={Favourites}/>
                    <Route path='/news/:news_url' component={News}/>
                    <Route path='/compare/:company_ids' component={Compare} />
                  </Switch>
                </div>
            </div>
        );
    }
}
