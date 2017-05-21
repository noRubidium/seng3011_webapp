// refer to the counter action
import async_action from 'utils/asyncAction';

const ABS_LOADING                = 'ABS_LOADING';
const ABS_LOADED                 = 'ABS_LOADED';
const ABS_FAILED                 = 'ABS_FAILED';
const INDUSTRY_COMPANIES_LOADING = 'INDUSTRY_COMPANIES_LOADING';
const INDUSTRY_COMPANIES_LOADED  = 'INDUSTRY_COMPANIES_LOADED';
const INDUSTRY_COMPANIES_FAILED  = 'INDUSTRY_COMPANIES_FAILED';

export const actionTypes = {
  INDUSTRY_COMPANIES_LOADING,
  INDUSTRY_COMPANIES_LOADED,
  INDUSTRY_COMPANIES_FAILED,
  ABS_LOADING,
  ABS_LOADED,
  ABS_FAILED,
};


export function load_abs_stats (dispatch, category) {
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

export function load_companies (dispatch, industry='Total') {
  async_action(
    {
      type: INDUSTRY_COMPANIES_LOADING,
      payload: industry,
    },
    INDUSTRY_COMPANIES_LOADED,
    dispatch,
    `http://api.kaiworship.xyz/mapping/ind/${industry}`,
    INDUSTRY_COMPANIES_FAILED
  );
}
