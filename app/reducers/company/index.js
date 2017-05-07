import { combineReducers } from 'redux';

import company_info from './company_info';
import company_news from './company_news';
import company_stats from './company_stats';
import company_price from './company_price';

export default combineReducers({
  company_info,
  company_news,
  company_stats,
  company_price,
});
