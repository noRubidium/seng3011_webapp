// refer to the counter action
import { async_action } from 'utils/asyncAction';

const INDUSTRY_COMPANIES_LOADING     = 'INDUSTRY_COMPANIES_LOADING';
const INDUSTRY_COMPANIES_LOADED      = 'INDUSTRY_COMPANIES_LOADED';
const INDUSTRY_COMPANIES_FAILED      = 'INDUSTRY_COMPANIES_FAILED';

export const actionTypes = {
  INDUSTRY_LOADING,
  INDUSTRY_LOADED,
  INDUSTRY_FAILED
};

export function load_industries (dispatch) {
  async_action(
    {
      type: INDUSTRY_LOADING,
    },
    INDUSTRY_LOADED,
    dispatch,
    `url`,
    INDUSTRY_FAILED
  );
}
