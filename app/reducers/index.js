import { combineReducers } from 'redux';

import counter from 'reducers/counter';
import company from 'reducers/company';

export default combineReducers({
  counter,
  company,
});
