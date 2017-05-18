import { combineReducers } from 'redux';

import company from 'reducers/company';
import categories from 'reducers/categories';
import company_list from 'reducers/company_list';
import news from 'reducers/news';
import news_feed from 'reducers/news_feed';
import home from 'reducers/home';

export default combineReducers({
  company,
  home,
  categories,
  company_list,
  news,
  news_feed
});
