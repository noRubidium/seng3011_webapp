import async_action from 'utils/asyncAction';

const COMPANY_PRICE_LOADING  = 'COMPANY_PRICE_LOADING';
const COMPANY_PRICE_LOADED   = 'COMPANY_PRICE_LOADED';
const COMPANY_PRICE_FIALED   = 'COMPANY_PRICE_FIALED';

export const companyPriceActionTypes = {
  COMPANY_PRICE_LOADING,
  COMPANY_PRICE_LOADED,
  COMPANY_PRICE_FIALED,
};

export function load_company_price (company_code, dispatch, props) {
  if (props.url === `${process.env.API_URL}/rapper/data.asx.com.au/data/1/share/${company_code.slice(0,3)}`) {
    return;
  }
  async_action(
    {
      type: COMPANY_PRICE_LOADING,
      payload: { company_code },
    },
    COMPANY_PRICE_LOADED,
    dispatch,
    `${process.env.API_URL}/rapper/data.asx.com.au/data/1/share/${company_code.slice(0,3)}`
  );
}
