import async_action from 'utils/asyncAction';

const COMPANY_NEWS_LOADING   = 'COMPANY_NEWS_LOADING';
const COMPANY_NEWS_LOADED    = 'COMPANY_NEWS_LOADED';
const COMPANY_NEWS_FAILED    = 'COMPANY_NEWS_FAILED';

export const companyNewsActionTypes = {
  COMPANY_NEWS_LOADING,
  COMPANY_NEWS_LOADED,
  COMPANY_NEWS_FAILED,
};

export function load_company_news (company_code, dispatch) {
  async_action(
    {
      type: COMPANY_NEWS_LOADING,
      payload: { company_code },
    },
    COMPANY_NEWS_LOADED,
    dispatch,
   `http://api.kaiworship.xyz/news/cmp/${company_code.substr(0, 3)}`
  );
}
