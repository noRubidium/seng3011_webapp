import async_action_xml from 'utils/asyncActionXML';

const COMPANY_NEWS_LOADING   = 'COMPANY_NEWS_LOADING';
const COMPANY_NEWS_LOADED    = 'COMPANY_NEWS_LOADED';
const COMPANY_NEWS_FAILED    = 'COMPANY_NEWS_FAILED';

export const companyNewsActionTypes = {
  COMPANY_NEWS_LOADING,
  COMPANY_NEWS_LOADED,
  COMPANY_NEWS_FAILED,
};

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
