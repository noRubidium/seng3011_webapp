// refer to the counter action
import async_action from 'utils/asyncAction';

const INDUSTRY_COMPANIES_LOADING     = 'INDUSTRY_COMPANIES_LOADING';
const INDUSTRY_COMPANIES_LOADED      = 'INDUSTRY_COMPANIES_LOADED';
const INDUSTRY_COMPANIES_FAILED      = 'INDUSTRY_COMPANIES_FAILED';

export const actionTypes = {
  INDUSTRY_COMPANIES_LOADING,
  INDUSTRY_COMPANIES_LOADED,
  INDUSTRY_COMPANIES_FAILED
};

export function load_companies (dispatch, industry='') {
  async_action(
    {
      type: INDUSTRY_COMPANIES_LOADING,
      payload: industry,
    },
    INDUSTRY_COMPANIES_LOADED,
    dispatch,
    `url${industry}`,
    INDUSTRY_COMPANIES_FAILED
  );
}
