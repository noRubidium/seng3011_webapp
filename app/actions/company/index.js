import X2JS from 'x2js';

// refer to the counter action
const COMPANY_PRICE_LOADING = 'COMPANY_PRICE_LOADING';
const COMPANY_PRICE_LOADED = 'COMPANY_PRICE_LOADED';
const COMPANY_DATA_LOADING = 'COMPANY_DATA_LOADING';
const COMPANY_DATA_LOADED = 'COMPANY_DATA_LOADED';
const COMPANY_NEWS_LOADING = 'COMPANY_NEWS_LOADING';
const COMPANY_NEWS_LOADED = 'COMPANY_NEWS_LOADED';
const COMPANY_STATS_LOADING = 'COMPANY_STATS_LOADING';
const COMPANY_STATS_LOADED = 'COMPANY_STATS_LOADED';

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

const async_action = (loading_action, loaded_action_type, dispatch, url) => {
  dispatch(loading_action);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dispatch({
        type: loaded_action_type,
        payload: data,
      })
    });
};

const async_action_xml = (loading_action, loaded_action_type, dispatch, url) => {
  dispatch(loading_action);
  const x2js = new X2JS();
  console.log(x2js);
  fetch(url)
    .then(response => response.text())
    .then(str => {
      const data = (x2js.xml2js(str));
      dispatch({
        type: loaded_action_type,
        payload: data.rss.channel.item,
      });
    });
};

export function load_company_price (company_code, dispatch) {
  async_action(
    {
      type: COMPANY_PRICE_LOADING,
      payload: { company_code },
    },
    COMPANY_PRICE_LOADED,
    dispatch,
    `http://api.kaiworship.xyz/rapper/data.asx.com.au/data/1/share/${company_code.slice(0,3)}/prices?interval=daily&count=1`
  );
}

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

export function load_company_stats (company_code, dispatch) {
  async_action(
    {
      type: COMPANY_STATS_LOADING,
      payload: { company_code },
    },
    COMPANY_STATS_LOADED,
    dispatch,
    `http://174.138.67.207/InstrumentID/${company_code}/DateOfInterest/2012-12-10/List_of_Var/CM_Return,AV_Return/Upper_window/5/Lower_window/3`
  );
}

export function load_company_news (company_code, dispatch) {
  async_action_xml(
    {
      type: COMPANY_NEWS_LOADING,
      payload: { company_code },
    },
    COMPANY_NEWS_LOADED,
    dispatch,
    `http://api.kaiworship.xyz/rapper/feeds.finance.yahoo.com/rss/2.0/headline%3Fs=${company_code}&region=AU&lang=en-US`
  );
}
