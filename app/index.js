import React from 'react';
import ReactDOM from 'react-dom';
import Auth0Lock from 'auth0-lock';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Main from 'containers/Main';
import store from 'store';
import { loadProfile } from 'actions/user/login';


const lock = new Auth0Lock('mIfSPvMFfjb23JvgOeZU45qAkcNPEkXS', 'seng3011.au.auth0.com', {});

const cleanUp = () => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  return (<Redirect to='/'/>);
};

const access = (route) => {
  const { params } = route.match;
  const { idToken, accessToken } = params;
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('id_token', idToken);
  store.dispatch({type: 'LOGGEDIN',payload: idToken});
  store.dispatch(loadProfile(lock, idToken));
  return (<Redirect to='/feeds'/>);
}

const loadProf = () => {
  // load profile
  // const lock = this.props.lock;

  if(localStorage.getItem('id_token')){
    store.dispatch(loadProfile(lock, localStorage.getItem('id_token')));
  }
}


class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/access_token=:accessToken&expires_in=:expires&id_token=:idToken&token_type=:tokenType&state=:state' render={access}/>
            <Route path='/clean' render={cleanUp} />
            <Route path='/' component={Main} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
