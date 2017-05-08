import csvjson from 'csvjson';
import X2JS from 'x2js';

// refer to the counter action
import { async_action } from 'utils/asyncAction';

const COMPANY_PRICE_LOADING  = 'COMPANY_PRICE_LOADING';
const COMPANY_PRICE_LOADED   = 'COMPANY_PRICE_LOADED';
const COMPANY_DATA_LOADING  = 'COMPANY_DATA_LOADING';
const COMPANY_DATA_LOADED   = 'COMPANY_DATA_LOADED';
const COMPANY_NEWS_LOADING  = 'COMPANY_NEWS_LOADING';
const COMPANY_NEWS_LOADED   = 'COMPANY_NEWS_LOADED';
const COMPANY_STATS_LOADING = 'COMPANY_STATS_LOADING';
const COMPANY_STATS_LOADED = 'COMPANY_STATS_LOADED';
const ABS_LOADING = 'ABS_LOADING';
const ABS_LOADED = 'ABS_LOADED';

export const actionTypes = {
  COMPANY_DATA_LOADING,
  COMPANY_DATA_LOADED,
  COMPANY_NEWS_LOADING,
  COMPANY_NEWS_LOADED,
  COMPANY_STATS_LOADING,
  COMPANY_STATS_LOADED,
  COMPANY_PRICE_LOADING,
  COMPANY_PRICE_LOADED,
  ABS_LOADING,
  ABS_LOADED,
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

export function load_abs_stats (category, dispatch) {
  async_action(
    {
      type: ABS_LOADING,
      payload: { category },
    },
    ABS_LOADED,
    dispatch,
    `http://api.kaiworship.xyz/v5/Retail/${category}/Total,NSW,WA,SA,ACT,VIC,TAS,QLD,NT?startDate=2000-01-01&endDate=2018-01-01`
  );
}

export function load_company_stats (company_id, dispatch) {
  dispatch({
    type: COMPANY_STATS_LOADING,
    payload: { company_id },
  });

  // get date
  const today = new Date();
  const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const mm = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();

  let financeData = [];
  const url = `http://adage.cse.unsw.edu.au:8080/yahooAPI/v1/data?period=EndOfDay&a_year=1990&a_mon=01&a_day=01&z_year=${yyyy}&z_mon=${mm}&z_day=${dd}&ins_code=${company_id}`;
  // shit have to load it ourselves
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const result = data.split('\n').filter((s) => (s.split(',').length === 7 && parseFloat(s.split(',')[6])))
        .map((s) => {
          const d = s.split(',');
          return {'date': d[0], 'price': parseFloat(d[6])};
        }).reverse();
      dispatch({
        type: COMPANY_STATS_LOADED,
        payload: result
      });
    });
}
