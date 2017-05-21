import csvjson from 'csvjson';

import async_action from 'utils/asyncAction';

const COMPANY_STATS_LOADING  = 'COMPANY_STATS_LOADING';
const COMPANY_STATS_LOADED   = 'COMPANY_STATS_LOADED';
const COMPANY_STATS_FAILED   = 'COMPANY_STATS_FAILED';

export const companyStatsActionTypes = {
  COMPANY_STATS_LOADING,
  COMPANY_STATS_LOADED,
  COMPANY_STATS_FAILED,
}


export function load_company_stats (company_id, dispatch, props) {
  const url = `http://api.kaiworship.xyz/cmp/${company_id}`;
  if (props.url === url) {
    return;
  }
  dispatch({
    type: COMPANY_STATS_LOADING,
    payload: { company_id },
    url,
  });

  // get date
  const today = new Date();

  let financeData = [];
  // shit have to load it ourselves
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const result = data.split('\n').filter((s) => (s.split(',').length === 7 && parseFloat(s.split(',')[5])))
        .map((s) => {
          const d = s.split(',');
          return {'date': d[0], 'price': parseFloat(d[5])};
        });

      dispatch({
        type: COMPANY_STATS_LOADED,
        payload: result,
        url,
      });
    });
}
