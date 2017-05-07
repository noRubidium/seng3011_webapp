import { combineReducers } from 'redux';

import counter from 'reducers/counter';
import company from 'reducers/company';
import home from 'reducers/home';

export default combineReducers({
  counter,
  company,
  home
});
