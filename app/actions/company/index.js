import X2JS from 'x2js';

// refer to the counter action
const COMPANY_DATA_LOADING = 'COMPANY_DATA_LOADING';
const COMPANY_DATA_LOADED = 'COMPANY_DATA_LOADED';
const COMPANY_NEWS_LOADING = 'COMPANY_NEWS_LOADING';
const COMPANY_NEWS_LOADED = 'COMPANY_NEWS_LOADED';
const COMPANY_STATS_LOADING = 'COMPANY_STATS_LOADING';
const COMPANY_STATS_LOADED = 'COMPANY_STATS_LOADED';
const COMPANY_PRICE_LOADING = 'COMPANY_PRICE_LOADING';
const COMPANY_PRICE_LOADED = 'COMPANY_PRICE_LOADED';


export const actionTypes = {
  COMPANY_DATA_LOADING,
  COMPANY_DATA_LOADED,
  COMPANY_NEWS_LOADING,
  COMPANY_NEWS_LOADED,
  COMPANY_STATS_LOADING,
  COMPANY_STATS_LOADED,
  COMPANY_PRICE_LOADING,
  COMPANY_PRICE_LOADED,
};

const async_action = (loading_action, loaded_action_type, dispatch, url) => {
  dispatch(loading_action);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      
      dispatch({
        type: loaded_action_type,
        payload: data,
      })
    });
};

const async_action_xml = (loading_action, loaded_action_type, dispatch, url) => {
  dispatch(loading_action);
  const x2js = new X2JS();
  
  fetch(url)
    .then((response) => response.text())
    .then((str) => {
      const data = (x2js.xml2js(str));
      dispatch({
        type: loaded_action_type,
        payload: data.rss.channel.item,
      });
    });
};

export function load_company_info (company_id, dispatch) {
  async_action(
    {
      type: COMPANY_DATA_LOADING,
      payload: { company_id },
    },
    COMPANY_DATA_LOADED,
    dispatch,
    `http://api.kaiworship.xyz/companies/${company_id}`
  );
}

export function load_company_price (company_id, dispatch) {
  async_action(
    {
      type: COMPANY_PRICE_LOADING,
      payload: { company_id },
    },
    COMPANY_PRICE_LOADED,
    dispatch,
    `http://api.kaiworship.xyz/rapper/data.asx.com.au/data/1/share/${company_id.slice(0,3)}/prices%3Finterval=daily&count=2`

  );
}

export function load_company_stats (company_id, dispatch) {
  const today = new Date();
  const lower_date = new Date(2003, 1, 1);

  const one_day = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  const diff_date = Math.round(Math.abs((lower_date.getTime() - today.getTime())/(one_day)));

  const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const mm = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();
  async_action(
    {
      type: COMPANY_STATS_LOADING,
      payload: { company_id },
    },
    COMPANY_STATS_LOADED,
    dispatch,
    `http://174.138.67.207/InstrumentID/${company_id}/DateOfInterest/${yyyy}-${mm}-${dd}/List_of_Var/Trading_Info/Upper_window/0/Lower_window/${diff_date}`
  );
}

export function load_company_news (company_id, dispatch) {
  async_action_xml(
    {
      type: COMPANY_NEWS_LOADING,
      payload: { company_id },
    },
    COMPANY_NEWS_LOADED,
    dispatch,
    `http://api.kaiworship.xyz/rapper/feeds.finance.yahoo.com/rss/2.0/headline%3Fs=${company_id}&region=AU&lang=en-US`
  );
}
