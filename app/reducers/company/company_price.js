import { actionTypes } from 'actions/company';

const default_state = {
  loading: false,
  /* Stub data for testing display*/
  code: 'DMP',
  close_date: "2017-05-05T00:00:00+1000",
  close_price: 61.5,
  change_price: -0.19,
  volume: 139717,
  day_high_price: 62.11,
  day_low_price: 61.26,
  change_in_percent: -0.308%

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
        loading: false,
        code: payload.code,
        close_date: payload.close_date,
        close: payload.close_price,
        change_price: payload.change_price,
        volume: payload.volume,
        day_high_price: payload.day_high_price,
        day_low_price: payload.day_low_price,
        change_in_percent: payload.change_in_percent
      };
  }
  return state;
};
