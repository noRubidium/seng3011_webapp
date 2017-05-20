import { actionTypes } from 'actions/company';

const default_state = {
  loading: false,
  error: false,
  loaded: false,
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
  const { type, payload, url } = action;
  switch (type) {
    case actionTypes.COMPANY_PRICE_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
        id: payload.company_code,
        url: url,
      };
    case actionTypes.COMPANY_PRICE_LOADED:
      if (url !== state.url) {
        return;
      }
      return {
        ...state,
        ...payload.data[0],
        loading: false,
        loaded: true,
        error: false,
        prev_close_price: payload.data[1].close_price,
      };
    case actionTypes.COMPANY_PRICE_FAILED:
      if (url !== state.url) {
        return;
      }
      return {
        ...state,
        ...payload.data[0],
        error: true,
        loading: false,
        loaded: false,
        error_msg: 'No up to date data for the stock',
      };
  }
  return state;
};
