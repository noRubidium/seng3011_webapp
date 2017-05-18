import { actionTypes } from 'actions/company';

const default_state = {
  loading: false,
  error: false,
  /* Stub data for testing display*/
  company_id: 'DMP',
  close_date: "2017-05-05T00:00:00+1000",
  close_price: 61.5,
  change_price: -0.19,
  volume: 139717,
  day_high_price: 62.11,
  day_low_price: 61.26,
  change_in_percent: '-0.308%',

};


export default (state=default_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.COMPANY_PRICE_LOADING:
      return {
        ...state,
        loading: true,
        id: payload.company_code,
      };
    case actionTypes.COMPANY_PRICE_LOADED:
      return {
        ...state,
        ...payload.data[0],
        loading: false,
        prev_close_price: payload.data[1].close_price,
      };
    case actionTypes.COMPANY_PRICE_FAILED:
      return {
        ...state,
        ...payload.data[0],
        loading: false,
        error_msg: 'No up to date data for the stock',
      };
  }
  return state;
};
