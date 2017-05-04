import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import Main from 'containers/Main';
import store from "store";

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Route component={Main} />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
