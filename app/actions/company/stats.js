import csvjson from 'csvjson';

import { async_action } from 'utils/asyncAction';

const COMPANY_STATS_LOADING  = 'COMPANY_STATS_LOADING';
const COMPANY_STATS_LOADED   = 'COMPANY_STATS_LOADED';
const COMPANY_STATS_FAILED   = 'COMPANY_STATS_FAILED';
const ABS_LOADING            = 'ABS_LOADING';
const ABS_LOADED             = 'ABS_LOADED';
const ABS_FAILED             = 'ABS_FAILED';

export const companyStatsActionTypes = {
  COMPANY_STATS_LOADING,
  COMPANY_STATS_LOADED,
  COMPANY_STATS_FAILED,
  ABS_LOADING,
  ABS_LOADED,
  ABS_FAILED,
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
