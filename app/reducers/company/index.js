import { combineReducers } from 'redux';

import company_info from './company_info';
import company_news from './company_news';
import company_stats from './company_stats';

export default combineReducers({
  company_info,
  company_news,
  company_stats,
});
