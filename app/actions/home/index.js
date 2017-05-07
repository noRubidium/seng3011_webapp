// refer to the counter action
import { async_action } from 'utils/asyncAction';

const COMPANIES_LOADING     = 'COMPANIES_LOADING';
const COMPANIES_LOADED      = 'COMPANIES_LOADED';

export const actionTypes = {
  COMPANIES_LOADING,
  COMPANIES_LOADED
};

export function load_companies (dispatch) {
  async_action(
    {
      type: COMPANIES_LOADING
    },
    COMPANIES_LOADED,
    dispatch,
    'http://api.kaiworship.xyz/companies/'
  );
}
