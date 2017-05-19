import { combineReducers } from 'redux';

import company from 'reducers/company';
import industries from 'reducers/industries';
import company_list from 'reducers/company_list';
import news from 'reducers/news';
import news_feed from 'reducers/news_feed';
import home from 'reducers/home';

export default combineReducers({
  company,
  home,
  industries,
  company_list,
  news,
  news_feed
});
