import X2JS from 'x2js';

// refer to the counter action
import { async_action } from 'utils/asyncAction';

const COMPANY_DATA_LOADING  = 'COMPANY_DATA_LOADING';
const COMPANY_DATA_LOADED   = 'COMPANY_DATA_LOADED';
const COMPANY_NEWS_LOADING  = 'COMPANY_NEWS_LOADING';
const COMPANY_NEWS_LOADED   = 'COMPANY_NEWS_LOADED';
const COMPANY_STATS_LOADING = 'COMPANY_STATS_LOADING';
const COMPANY_STATS_LOADED  = 'COMPANY_STATS_LOADED';

export const actionTypes = {
  COMPANY_PRICE_LOADING,
  COMPANY_PRICE_LOADED,
  COMPANY_DATA_LOADING,
  COMPANY_DATA_LOADED,
  COMPANY_NEWS_LOADING,
  COMPANY_NEWS_LOADED,
  COMPANY_STATS_LOADING,
  COMPANY_STATS_LOADED
};


export function load_company_info (company_code, dispatch) {
  async_action(
    {
      type: COMPANY_DATA_LOADING,
      payload: { company_code },
    },
    COMPANY_DATA_LOADED,
    dispatch,
    `http://api.kaiworship.xyz/companies/${company_code}`
  );
}

export function load_company_news (company_code, dispatch) {
  async_action(
    {
      type: COMPANY_NEWS_LOADING,
      payload: { company_code },
    },
    COMPANY_NEWS_LOADED,
    dispatch,
   `http://api.kaiworship.xyz/rapper/feeds.finance.yahoo.com/rss/2.0/headline%3Fs=${company_code}&region=AU&lang=en-US`
  );
}

export function load_company_stats (company_code, dispatch) {
  async_action(
    {
      type: COMPANY_STATS_LOADING,
      payload: { company_code },
    },
    COMPANY_STATS_LOADED,
    dispatch,
    `http://api.kaiworship.xyz/companies/${company_code}`
  );
}
